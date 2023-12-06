import React, { memo, useMemo } from 'react';
import { Avatar, Grid, ListItemButton, Typography } from '@mui/material';
import moment from 'moment';
import propTypes from 'prop-types';
import {
  cardDateTimeStyles,
  cardListItemBtnStyles,
} from 'styles/mui/containers/humanAgentStyles';

function ChatCard({ name, lastMessage, chatDate, handleClick, roomDetails, isSelected }) {
  const date = useMemo(() => moment(chatDate).format('MMM DD'), [chatDate]);
  const time = useMemo(() => moment(chatDate).format('hh:mm A'), [chatDate]);

  return (
    <ListItemButton
      className="w-100"
      divider
      sx={cardListItemBtnStyles}
      onClick={() => handleClick(roomDetails?.id, roomDetails?.room_id)}
      selected={isSelected}
    >
      <Grid container alignItems="center">
        <Grid item container xs={12} md={9} columnSpacing={1}>
          <Grid item>
            <Avatar sx={{ width: 30, height: 30 }} />
          </Grid>

          <Grid item xs={6} sm={8}>
            <Typography variant="body2" className="w-100 text-truncate" fontWeight={500}>
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
          <Typography variant="caption" component="p" sx={cardDateTimeStyles}>
            {date}
          </Typography>

          <Typography variant="caption" component="p" sx={cardDateTimeStyles}>
            {time}
          </Typography>
        </Grid>
      </Grid>
    </ListItemButton>
  );
}

ChatCard.propTypes = {
  name: propTypes.string.isRequired,
  lastMessage: propTypes.string.isRequired,
  chatDate: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
  roomDetails: propTypes.object.isRequired,
  isSelected: propTypes.bool,
};

ChatCard.defaultProps = {
  isSelected: false,
};

export default memo(ChatCard);
