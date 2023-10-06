import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';



const apiUrl = 'http://localhost:3000/api'; //'/api'
const httpClient = fetchUtils.fetchJson;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    };

    // Add filter query parameters to the query object
    if (params.filter) {
      const filterQuery = {
        ...params.filter,
      };
      query.filter = JSON.stringify(filterQuery);
    }

    // Add search query parameter to the query object
    if (params.filter && params.filter.q) {
      query.q = params.filter.q;
      delete params.filter.q;
    }

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const { headers, json } = await httpClient(url);
    return {
      data: json.map((resource_1) => ({ ...resource_1, id: resource_1._id })),
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    };
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: { ...json, id: json._id }, //!
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({
      data: json.map((resource) => ({ ...resource, id: resource._id })),
    }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json.map((resource) => ({ ...resource, id: resource._id })),
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  update: (resource, params) => {
    const { data } = params;
    const url = `${apiUrl}/${resource}/${data.id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        return { data: json };
      });
  },

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: async (resource, params) => {
    try {
      const { id, ...data } = params.data;
      const response = await httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify({ ...data, id }),
      });

      const { json } = response;

      if (json.error) {
        throw new Error('AccountId is not unique');
      }

      return {
        data: { ...params.data, id: json._id },
      };
    } catch (error) {
      // Handle the error here
      console.log(error.message);
      throw error; // Optional: re-throw the error to allow the calling code to handle it
    }
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
      body: JSON.stringify(params.id),
    }).then(({ json }) => ({
      ...json,
      id: json._id,
    })),
  //in progress
  deleteMany: (resource, params) =>
    new Promise((resolve, reject) => {
      httpClient(`${apiUrl}/${resource}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: params.ids }),
      })
        .then(({ json }) => {
          const data = json.map((item) => ({ ...item, id: item._id }));
          resolve({ data });
        })
        .catch((error) => {
          reject(error);
        });
    }),

  exportMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}/export?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },
};
