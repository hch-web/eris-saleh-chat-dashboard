import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardArrowDown, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// ASSETS & STYLES
import styles from 'styles/common/layout.module.scss';
import logo from 'assets/Eris-AI-logo.png';
import avatarImgURL from 'assets/profile-image-2.png';
import { onLoggedOut } from 'store/slices/authSlice';
import useGetUserData from 'customHooks/useGetUserData';
import useGetMenuHandlers from 'customHooks/useGetMenuHandlers';
import {
  profileMenuPositionProps,
  profileMenuStyles,
} from 'styles/mui/containers/layoutStyles';
import NotificationMenu from './NotificationMenu';
import useNotificationsSocket from '../customHooks/useNotificationsSocket';

function Navbar() {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth.user);
  const unreadNotifications = useSelector(state => state.notifications.unread);
  const { firstName } = useGetUserData();
  const [profileMenu, handleOpenProfileMenu, handleCloseProfileMenu] =
    useGetMenuHandlers();
  const [notificationMenu, handleOpenNotiMenu, handleCloseNotiMenu] =
    useGetMenuHandlers();

  useNotificationsSocket();

  const handleLogout = () => {
    handleCloseProfileMenu();
    dispatch(onLoggedOut());
  };

  return (
    <Box p={2} className={styles.navbarContainer}>
      <img className={styles.navLogo} src={logo} alt="Logo" />

      <Box className="d-flex align-items-center gap-4">
        <IconButton onClick={handleOpenNotiMenu}>
          <Badge badgeContent={unreadNotifications} color="primary">
            <Notifications />
          </Badge>
        </IconButton>

        <Stack
          className="pointer"
          direction="row"
          alignItems="center"
          spacing={2}
          onClick={handleOpenProfileMenu}
        >
          <Avatar src={avatarImgURL} />

          <Typography variant="body1">{firstName}</Typography>

          <KeyboardArrowDown />
        </Stack>
      </Box>

      <Menu
        key={profileMenu}
        open={!!profileMenu}
        anchorEl={profileMenu}
        onClose={handleCloseProfileMenu}
        sx={profileMenuStyles}
        {...profileMenuPositionProps}
      >
        <MenuItem
          className="justify-content-center"
          component={Link}
          to={`/profile/${id}`}
          onClick={handleCloseProfileMenu}
        >
          Profile
        </MenuItem>

        <Divider className="my-1" />

        <MenuItem className="justify-content-center" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>

      <NotificationMenu anchorEl={notificationMenu} handleClose={handleCloseNotiMenu} />
    </Box>
  );
}

export default Navbar;
