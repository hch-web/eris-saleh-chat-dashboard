import React, { useState } from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// ASSETS & STYLES
import styles from 'styles/common/layout.module.scss';
import logo from 'assets/logo.svg';
import { onLoggedOut } from 'store/slices/authSlice';
import { Link } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const [profileMenu, setProfileMenu] = useState(false);
  const { id } = useSelector(state => state.auth.user);

  const handleOpenMenu = e => {
    setProfileMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setProfileMenu(null);
  };

  const handleLogout = () => {
    setProfileMenu(null);
    dispatch(onLoggedOut());
  };

  return (
    <Box
      sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      p={2}
      className={`${styles.navbarContainer}`}
    >
      <img className={styles.navLogo} src={logo} alt="Logo" />

      <IconButton className="p-0" onClick={handleOpenMenu}>
        <Avatar />
      </IconButton>

      <Menu
        key={profileMenu}
        open={!!profileMenu}
        anchorEl={profileMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem component={Link} to={`/profile/${id}`} onClick={handleCloseMenu}>
          Profile
        </MenuItem>

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default Navbar;
