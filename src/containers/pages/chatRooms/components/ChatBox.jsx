import React, { useMemo } from 'react';
import { Avatar, Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';

// COMPONENTS & STYLES
import {
  chatBoxBodyWrapperStyles,
  chatBoxHeaderStyles,
} from 'styles/mui/containers/chatRoomsStyles';
import { useGetChatDetilsQuery } from 'services/private/chatRooms';
// import MessageItem from '';
import MessageItem from 'containers/common/components/MessageItem';
import { handleAddHumanAgentDivider } from 'containers/pages/humanAgent/utilities/helpers';
import HumanAgentDivider from 'containers/common/components/HumanAgentDivider';
import { v4 } from 'uuid';
import { useChatContext } from '../contexts/chatContexts';

function ChatBox() {
  const { selectedChatId, feedback } = useChatContext();

  const { data: chatMessages } = useGetChatDetilsQuery(selectedChatId, {
    skip: !selectedChatId,
    refetchOnMountOrArgChange: true,
  });

  const sortedMessages = useMemo(() => {
    if (chatMessages?.results?.length > 0) {
      return handleAddHumanAgentDivider(chatMessages.results);
    }

    return [];
  }, [chatMessages]);

  return (
    <Grid item xs={12} lg={4} xl={6} order={{ xs: 3, lg: 2 }}>
      <Paper>
        {/* CHAT HEADER */}
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          width={1}
          padding={1}
          sx={chatBoxHeaderStyles}
        >
          <Avatar />

          <Typography variant="body2" fontWeight={500} className="truncate-2">
            {feedback.chatName ?? 'Chat'}
          </Typography>
        </Stack>

        <Divider />

        {/* CHAT BODY */}
        <Box sx={chatBoxBodyWrapperStyles}>
          <Box className="d-flex flex-column align-items-start p-3 gap-3">
            {sortedMessages?.map(item => {
              const isBot = item?.message_sender === 'AI';

              return item?.type === 'DIVIDER' ? (
                <HumanAgentDivider key={v4()} message={item?.message} />
              ) : (
                <MessageItem
                  message={item?.text_message}
                  audioMsg={item?.audio_message}
                  isBot={isBot}
                  key={item.id}
                  isLiked={item?.is_liked}
                />
              );
            })}
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default ChatBox;
