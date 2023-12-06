import React from 'react';
import { Box, Paper } from '@mui/material';
import { v4 } from 'uuid';

import {
  chatBoxPaperStyles,
  chatMessageContainerStyles,
} from 'styles/mui/containers/humanAgentStyles';
import { useGetSelectedChatQuery } from 'services/private/humanAgent';
import MessageItem from 'containers/common/components/MessageItem';
import avatarImage from 'assets/BES_LOGO-icon.png';
import HumanAgentDivider from 'containers/common/components/HumanAgentDivider';
import ChatForm from './ChatForm';
import { useHumanAgentContext } from '../context/HumanAgentContext';
import useGetModifiedMessages from '../customHooks/useGetModifiedMessages';

function ChatBox() {
  const { selectedId } = useHumanAgentContext();
  const { data } = useGetSelectedChatQuery(selectedId, { skip: !selectedId });
  const chatMessages = useGetModifiedMessages(data);

  return (
    <Paper sx={chatBoxPaperStyles}>
      <Box sx={chatMessageContainerStyles}>
        {chatMessages?.map(item => {
          const isAdmin = item?.message_sender === 'Admin';
          const isHuman = item?.message_sender === 'Human';
          const isAI = item?.message_sender === 'AI';
          const isDivider = item?.type === 'DIVIDER';

          return isDivider ? (
            <HumanAgentDivider key={v4()} message={item?.message} />
          ) : (
            <MessageItem
              message={item?.text_message}
              audioMsg={item?.audio_message}
              isBot={isHuman}
              key={item.id}
              isLiked={item?.is_liked}
              imageURL={isAdmin || isAI ? avatarImage : null}
              removeIMG={isHuman}
            />
          );
        })}

        <Box id="_end_message_block" sx={{ height: '5px', width: 1 }} />
      </Box>

      <Box className="px-3 py-2">
        <ChatForm />
      </Box>
    </Paper>
  );
}

export default ChatBox;
