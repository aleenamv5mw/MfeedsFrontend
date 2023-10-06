import React from 'react';
import { useLogout, useTranslate } from 'react-admin';
import {
  Avatar,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';

const ProfileIcon = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const translate = useTranslate();
  const logout = useLogout();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <>
      <Avatar onClick={handleClick}>
        <AccountCircle />
      </Avatar>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary={translate('profile.email')}
              //   secondary={currentUserEmail}
            />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={translate('auth.signOut')} />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default ProfileIcon;
