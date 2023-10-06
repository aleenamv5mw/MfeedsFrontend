import React from 'react';
import { useMutation } from 'react-admin';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const BulkDeleteButton = ({ selectedIds }) => {
  const [deleteMany, { loading }] = useMutation();
  const handleClick = () => {
    deleteMany({
      type: 'deleteMany',
      resource: 'accounts',
      payload: { ids: selectedIds },
    });
  };
  return (
    <Button
      label="Bulk Delete"
      onClick={handleClick}
      disabled={loading}
      startIcon={<DeleteIcon />}
    />
  );
};

export default BulkDeleteButton;
