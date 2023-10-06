import React from 'react';
import Delete from '@material-ui/icons/Delete';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import {
  List,
  Datagrid,
  TextField,
  DeleteWithConfirmButton,
  TextInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

// Define the filters for your data
const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="time" label="Time" reference="accountName">
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

const LogList = (props) => {
  return (
    <List filters={postFilters} {...props}>
      <Datagrid>
        <TextField source="id" label="Log ID" />
        <TextField source="User" label="User" />
        <TextField source="UserType" label="UserType" />
        <TextField source="Timestamp" label="Timestamp" />

        <DeleteWithConfirmButton
          label="Delete" // label of delete button (default: 'Delete')
          confirmColor="warning" // color of delete button ('warning' or 'primary', default: 'warning')
          ConfirmIcon={Delete} // icon of delete button (default: 'Delete')
          cancel="Cancel" // label of cancel button (default: 'Cancel')
          CancelIcon={ErrorOutline} // icon of cancel button (default: 'ErrorOutline')
          undoable={true}
          basePath="/logs"
        />
      </Datagrid>
    </List>
  );
};

export default LogList;
