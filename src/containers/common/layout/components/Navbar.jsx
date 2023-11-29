import React, { useState } from 'react';
import { Avatar, Box, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// ASSETS & STYLES
import styles from 'styles/common/layout.module.scss';
import logo from 'assets/BES_LOGO.png';
import avatarImgURL from 'assets/profile-image-2.png';
import { onLoggedOut } from 'store/slices/authSlice';
import useGetUserData from 'customHooks/useGetUserData';

function Navbar() {
  const dispatch = useDispatch();
  const [profileMenu, setProfileMenu] = useState(false);
  const { id } = useSelector(state => state.auth.user);
  const { firstName } = useGetUserData();

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
      className={styles.navbarContainer}
    >
      <img className={styles.navLogo} src={logo} alt="Logo" />

      <Stack
        className="pointer"
        direction="row"
        alignItems="center"
        spacing={2}
        onClick={handleOpenMenu}
      >
        <Avatar src={avatarImgURL} />

        <Typography variant="body1">{firstName}</Typography>

        <KeyboardArrowDown />
      </Stack>

      <Menu
        key={profileMenu}
        open={!!profileMenu}
        anchorEl={profileMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ '& .MuiPaper-root': { minWidth: '120px', marginTop: '10px' } }}
      >
        <MenuItem
          className="justify-content-center"
          component={Link}
          to={`/profile/${id}`}
          onClick={handleCloseMenu}
        >
          Profile
        </MenuItem>

        <Divider className="my-1" />

        <MenuItem className="justify-content-center" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Navbar;
