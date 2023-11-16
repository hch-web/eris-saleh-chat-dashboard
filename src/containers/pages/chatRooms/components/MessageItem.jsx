import React from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ThumbDown, ThumbUp } from '@mui/icons-material';

import { messageBoxStyles } from 'styles/mui/containers/chatRoomsStyles';
import { avatarImgURL } from 'utilities/constants';

function MessageItem({ isBot, message, audioMsg, isLiked }) {
  return (
    <Stack direction={isBot ? 'row' : 'row-reverse'} gap={2} width={1}>
      <Avatar src={isBot ? avatarImgURL : null} />

      {audioMsg && (
        <audio src={audioMsg} controls>
          <track kind="captions" />
        </audio>
      )}

      {message && !audioMsg && (
        <Box sx={messageBoxStyles(isBot)}>
          <Typography className="preLineBreak" variant="body2">
            {message}
          </Typography>
        </Box>
      )}

      {isBot && isLiked !== null && (
        <Stack direction="row" spacing={1} alignSelf="center">
          {isLiked ? (
            <ThumbUp color="warning" sx={{ fontSize: 14 }} />
          ) : (
            <ThumbDown color="warning" sx={{ fontSize: 14 }} />
          )}
        </Stack>
      )}
    </Stack>
  );
}

MessageItem.propTypes = {
  isBot: PropTypes.bool.isRequired,
  message: PropTypes.string,
  audioMsg: PropTypes.string,
  isLiked: PropTypes.bool,
};

MessageItem.defaultProps = {
  message: null,
  audioMsg: null,
  isLiked: null,
};

export default MessageItem;
