import { useState, useCallback } from 'react';

const useGetMenuHandlers = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = useCallback(e => {
    setAnchorEl(e?.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return [anchorEl, handleOpen, handleClose];
};

export default useGetMenuHandlers;
