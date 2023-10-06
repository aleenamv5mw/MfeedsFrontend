import React, { useState } from 'react';
import { Filter, TextInput, SelectInput, useGetList } from 'react-admin';

const AccountSearch = (props) => {
  const [selectedSource, setSelectedSource] = useState('accountName'); // default source

  const { data } = useGetList(
    'accounts',
    { page: 1, perPage: 1000 },
    { field: 'id', order: 'ASC' }
  );

  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <SelectInput
        source="selectedSource"
        label="Search In"
        choices={[
          { id: 'accountName', name: 'Account Name' },
          { id: 'salesRepresentative', name: 'Sales Representative' },
          { id: 'email', name: 'Email' },
        ]}
        onChange={(e) => setSelectedSource(e.target.value)}
      />
      <TextInput label="Value" source={selectedSource} alwaysOn />
    </Filter>
  );
};

export default AccountSearch;
