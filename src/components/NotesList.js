import React from 'react';
import Delete from '@material-ui/icons/Delete';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { BulkDeleteButton, BulkExportButton } from 'react-admin';
import { Fragment } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteWithConfirmButton,
  DateField,
  UrlField,
} from 'react-admin';

const PostBulkActionButtons = () => (
  <Fragment>
    <BulkExportButton />
    <BulkDeleteButton />
  </Fragment>
);
const NotesList = (props) => {
  return (
    <List {...props}>
      <Datagrid
        bulkActionButtons={<PostBulkActionButtons />}
        sx={{
          //backgroundColor: '#fcfcf4',
          '& .RaDatagrid-headerCell': {
            backgroundColor: '#a599c5',
            //color: '#ffffff',
            fontWeight: 'bold',
          },
        }}
      >
        <TextField source="rssId" label="RSS ID" />
        <DateField source="date" />
        <UrlField source="rssLink" />

        <DeleteWithConfirmButton
          label="Delete" // label of delete button (default: 'Delete')
          confirmColor="warning" // color of delete button ('warning' or 'primary', default: 'warning')
          ConfirmIcon={Delete} // icon of delete button (default: 'Delete')
          cancel="Cancel" // label of cancel button (default: 'Cancel')
          CancelIcon={ErrorOutline} // icon of cancel button (default: 'ErrorOutline')
          undoable={true}
          basePath="/rssfeeds"
        />
      </Datagrid>
    </List>
  );
};

export default NotesList;
