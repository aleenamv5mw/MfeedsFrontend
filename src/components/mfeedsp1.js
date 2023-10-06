import { List, Datagrid, DatagridConfigurable, TextField } from 'react-admin';

const PostList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="author" />
      <TextField source="year" />
    </Datagrid>
  </List>
);
