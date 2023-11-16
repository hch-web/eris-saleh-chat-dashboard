/* COMMENTING THIS ARCHIVE FEATURE FOR NOW, IF REQUIRED WILL UNCOMMENT THIS */
import React, { memo, useMemo, useState } from 'react';
import { Avatar, Box, Grid, IconButton, ListItemButton, Typography } from '@mui/material';
import { Archive, Unarchive } from '@mui/icons-material';
import moment from 'moment';
import propTypes from 'prop-types';

import {
  chatArchiveBtnStyles,
  chatRoomCardDateStyles,
  chatRoomCardListItemBtnStyles,
} from 'styles/mui/containers/chatRoomsStyles';
import {
  useMarkChatArchiveMutation,
  useMarkChatUnArchiveMutation,
} from 'services/private/chatRooms';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';

function RoomCard({ name, lastMessage, chatDate, handleClick, roomDetails, isArchived }) {
  const [isHovered, setIsHovered] = useState(false);

  const [markArchive, { error: archiveError, isSuccess: isArchiveSuccess }] =
    useMarkChatArchiveMutation();
  const [markUnArchive, { error: unArchiveError, isSuccess: isUnArchiveSuccess }] =
    useMarkChatUnArchiveMutation();

  useHandleApiResponse(archiveError, isArchiveSuccess, 'Chat archived successfully!');
  useHandleApiResponse(
    unArchiveError,
    isUnArchiveSuccess,
    'Chat unarchived successfully!'
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleArchive = async () => {
    await markArchive(roomDetails.id);
  };

  const handleUnarchive = async () => {
    await markUnArchive(roomDetails.id);
  };

  const date = useMemo(() => moment(chatDate).format('MMM DD'), [chatDate]);
  const time = useMemo(() => moment(chatDate).format('hh:mm A'), [chatDate]);

  return (
    <Box
      className="position-relative w-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListItemButton
        className="w-100"
        divider
        sx={chatRoomCardListItemBtnStyles}
        onClick={() => handleClick(roomDetails)}
      >
        <Grid container alignItems="center">
          <Grid item container xs={12} md={9} columnSpacing={1}>
            <Grid item>
              <Avatar sx={{ width: 30, height: 30 }} />
            </Grid>

            <Grid item xs={6} sm={8}>
              <Typography
                variant="body2"
                className="w-100 text-truncate"
                fontWeight={500}
              >
                {name}
              </Typography>

              <Typography variant="caption" component="p" className="w-100 text-truncate">
                {lastMessage}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            className="d-flex d-md-block justify-content-end align-items-center gap-2 text-muted text-center"
          >
            <Typography variant="caption" component="p" sx={chatRoomCardDateStyles}>
              {date}
            </Typography>

            <Typography variant="caption" component="p" sx={chatRoomCardDateStyles}>
              {time}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>

      <Box sx={chatArchiveBtnStyles(isHovered)}>
        {isArchived ? (
          <IconButton onClick={handleUnarchive}>
            <Unarchive />
          </IconButton>
        ) : (
          <IconButton onClick={handleArchive}>
            <Archive />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

RoomCard.propTypes = {
  name: propTypes.string.isRequired,
  lastMessage: propTypes.string.isRequired,
  chatDate: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
  roomDetails: propTypes.object.isRequired,
  isArchived: propTypes.bool.isRequired,
};

export default memo(RoomCard);
