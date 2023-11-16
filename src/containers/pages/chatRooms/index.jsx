import React, { useMemo, useState } from 'react';
import { Box, Grid } from '@mui/material';

// COMPONENTS
import Rooms from './components/Rooms';
import ChatBox from './components/ChatBox';
import Feedback from './components/Feedback';
import { ChatContext } from './contexts/chatContexts';
import UnselectedChatbox from './components/UnselectedChatbox';

function ChatRooms() {
  const [feedback, setFeedback] = useState({ rating: 0, text: '', time: '' });
  const [selectedChatId, setSelectedChatId] = useState(null);

  const contextValue = useMemo(
    () => ({
      feedback,
      setFeedback,
      selectedChatId,
      setSelectedChatId,
    }),
    [feedback, selectedChatId]
  );

  return (
    <Box>
      <ChatContext.Provider value={contextValue}>
        <Grid container spacing={2}>
          <Rooms />

          {selectedChatId ? (
            <>
              <ChatBox />

              <Feedback />
            </>
          ) : (
            <UnselectedChatbox />
          )}
        </Grid>
      </ChatContext.Provider>
    </Box>
  );
}

export default ChatRooms;
