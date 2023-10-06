//subscription list
import React, { useState } from 'react';
import { BulkExportButton } from 'react-admin';
import { Fragment } from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  TextInput,
  ReferenceInput,
  SelectInput,
  Toolbar,
  Button,
  useDataProvider,
  useNotify,
  useRefresh,
} from 'react-admin';
const PostBulkActionButtons = () => (
  <Fragment>
    <BulkExportButton />
  </Fragment>
);

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput
    source="accountName"
    label="Account name"
    reference="accountName"
  >
    <SelectInput optionText="name" />
  </ReferenceInput>,
];

const useDeactivateSubscriptions = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();

  const handleDeactivate = () => {
    Promise.all(
      selectedIds.map((id) =>
        dataProvider.update('subscriptions', {
          id,

          data: { status: 'Deactivated' },
        })
      )
    ).then(() => {
      setSelectedIds([]);
      notify('Selected subscriptions have been deactivated');
      refresh();
    });
  };

  return { selectedIds, setSelectedIds, handleDeactivate };
};

const CustomToolbar = ({ selectedIds, handleDeactivate, ...props }) => (
  <Toolbar {...props}>
    <Button
      label="Deactivate"
      onClick={handleDeactivate}
      disabled={!selectedIds.length}
    />
  </Toolbar>
);

const SubList = (props) => {
  const { selectedIds, setSelectedIds } = useDeactivateSubscriptions();

  return (
    <List filters={postFilters} {...props}>
      <Datagrid
        bulkActionButtons={<PostBulkActionButtons />}
        rowClick="edit"
        selectedIds={selectedIds}
        onUnselectItem={(id) =>
          setSelectedIds(selectedIds.filter((i) => i !== id))
        }
        onToggleItem={(id) =>
          setSelectedIds(
            selectedIds.includes(id)
              ? selectedIds.filter((i) => i !== id)
              : [...selectedIds, id]
          )
        }
        sx={{
          //backgroundColor: '#fcfcf4',
          '& .RaDatagrid-headerCell': {
            backgroundColor: '#8ccb0c',
            //color: '#ffffff',
            fontWeight: 'bold',
          },
        }}
      >
        <TextField source="orderId" label="Order Id" />
        <TextField source="accountId" label="Account Id" />
        <TextField source="accountName" />
        <DateField source="startDate" />
        <DateField source="endDate" />
        <TextField source="subscriptionType" />
        <TextField source="status" />
        <EditButton basePath="/subscriptions" />
      </Datagrid>
      {/*   <CustomToolbar
        selectedIds={selectedIds}
        handleDeactivate={handleDeactivate}
      /> */}
    </List>
  );
};

export default SubList;
