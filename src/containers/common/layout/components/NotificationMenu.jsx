import React, { useMemo } from 'react';
import { Avatar, ListItemButton, ListItemText, Menu, Grow } from '@mui/material';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
  notiListItemBtnStyles,
  notificationMenuPositionProps,
  notificationMenuStyles,
} from 'styles/mui/containers/layoutStyles';
import { useSelector } from 'react-redux';
import moment from 'moment';

function NotificationMenu({ anchorEl, handleClose }) {
  const navigate = useNavigate();
  const notifcationsData = useSelector(state => state.notifications?.data);

  const handleClickNotification = (roomId, room) => {
    navigate(`/human-agent?i=${roomId}&rid=${room}`, { replace: true });
    handleClose();
  };

  const sortedNotifications = useMemo(
    () => [...notifcationsData].sort(
      (a, b) => new Date(b?.created_at) - new Date(a?.created_at)
    ),
    [notifcationsData]
  );

  return (
    <Menu
      key={!!anchorEl}
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleClose}
      sx={notificationMenuStyles}
      {...notificationMenuPositionProps}
      TransitionComponent={Grow}
    >
      {sortedNotifications?.map(noti => (
        <ListItemButton
          onClick={() => handleClickNotification(noti?.room_id, noti?.room)}
          key={noti?.id}
          className="gap-2"
          autoFocus={false}
          // selected={noti?.is_read}
          divider
          disabled={noti?.is_read}
        >
          <Avatar sx={{ width: 30, height: 30 }} />

          <ListItemText
            primaryTypographyProps={{ fontSize: 12 }}
            secondaryTypographyProps={{ fontSize: 10, mt: 1 }}
            primary={noti?.notification_text || 'NA'}
            secondary={moment(noti?.created_at).format('MMM DD, hh:mm A')}
            sx={notiListItemBtnStyles}
          />
        </ListItemButton>
      ))}
    </Menu>
  );
}

NotificationMenu.propTypes = {
  anchorEl: propTypes.object,
  handleClose: propTypes.func.isRequired,
};

NotificationMenu.defaultProps = {
  anchorEl: null,
};

export default NotificationMenu;
