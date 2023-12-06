import React, { useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import ChatLists from './components/ChatLists';
import ChatBox from './components/ChatBox';
import { HumanAgentContext } from './context/HumanAgentContext';

function HumanAgent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [chatMessages, setChatMessages] = useState([]);

  const contextValue = useMemo(
    () => ({
      selectedId: searchParams.get('i'),
      selectedRoom: searchParams.get('rid'),
      searchParams,
      setSearchParams,
      chatMessages,
      setChatMessages,
    }),
    [searchParams, chatMessages]
  );

  return (
    <Grid container columnSpacing={3} rowGap={3}>
      <HumanAgentContext.Provider value={contextValue}>
        <Grid item xs={12} md={4}>
          <ChatLists />
        </Grid>

        <Grid item xs={12} md={8}>
          <ChatBox />
        </Grid>
      </HumanAgentContext.Provider>
    </Grid>
  );
}

export default HumanAgent;
