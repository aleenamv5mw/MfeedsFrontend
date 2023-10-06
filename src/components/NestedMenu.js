import React from 'react';
import { ListSubheader, MenuItem } from '@material-ui/core';
import SearchListings from './SearchListings';

const nestedMenuItems = [
  { name: 'Submenu Item 1', link: '/submenu-item-1' },
  { name: 'Submenu Item 2', link: '/submenu-item-2' },
  { name: 'Submenu Item 3', link: '/submenu-item-3' },
];

const NestedMenu = () => (
  <>
    <ListSubheader>Submenu</ListSubheader>
    {nestedMenuItems.map((item) => (
      <MenuItem key={item.link} component={SearchListings} to={item.link}>
        {item.name}
      </MenuItem>
    ))}
  </>
);

export default NestedMenu;
