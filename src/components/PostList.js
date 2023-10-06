import React from 'react';
import Delete from '@material-ui/icons/Delete';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import {
  BulkDeleteButton,
  BulkExportButton,
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteWithConfirmButton,
  ReferenceInput,
  SelectInput,
  SearchInput,
  useNotify,
  useDataProvider,
} from 'react-admin';
import { Fragment } from 'react';

// Define filter for search
export const postFilters = [
  <SearchInput source="q" alwaysOn />,
  <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

const PostBulkActionButtons = ({ basePath, selectedIds }) => {
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleBulkDelete = () => {
    dataProvider
      .deleteMany('accounts', { ids: selectedIds })
      .then(() => {
        console.log('Bulk delete successful');
        notify('Bulk delete successful');
      })
      .catch((error) => {
        console.error('Error deleting accounts:', error);
        notify('Error deleting accounts', 'error');
      });
  };

  return (
    <Fragment>
      <BulkExportButton />
      <BulkDeleteButton
        basePath={basePath}
        resource="accounts"
        selectedIds={selectedIds}
        onClick={handleBulkDelete}
      />
    </Fragment>
  );
};

const PostList = (props) => {
  const notify = useNotify();

  const handleSuccess = () => {
    console.log('Delete successful');
    notify('Delete successful');
  };

  return (
    <List filters={postFilters} {...props}>
      <Datagrid
        bulkActionButtons={<PostBulkActionButtons />}
        sx={{
          //backgroundColor: '#fcfcf4',
          '& .RaDatagrid-headerCell': {
            backgroundColor: '#DE3163',
            //color: '#ffffff',
            fontWeight: 'bold',
          },
        }}
      >
        <TextField source="accountId" label="Account ID" />
        <TextField source="accountName" />
        <TextField source="salesRepresentative" />
        <TextField source="region" />
        <EmailField source="email" />
        <EditButton basePath="/accounts" />
        <DeleteWithConfirmButton
          label="Delete" // label of delete button (default: 'Delete')
          confirmColor="warning" // color of delete button ('warning' or 'primary', default: 'warning')
          ConfirmIcon={Delete} // icon of delete button (default: 'Delete')
          cancel="Cancel" // label of cancel button (default: 'Cancel')
          CancelIcon={ErrorOutline} // icon of cancel button (default: 'ErrorOutline')
          undoable={true}
          basePath="/accounts"
          onSuccess={handleSuccess} // add onSuccess prop to show success message
        />
      </Datagrid>
    </List>
  );
};

export default PostList;
