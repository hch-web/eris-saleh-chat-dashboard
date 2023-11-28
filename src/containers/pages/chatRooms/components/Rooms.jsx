import React, { memo, useEffect, useMemo, useState } from 'react';
import { Divider, Grid, Paper, Tab, Tabs } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

// COMPONENTS & STYLES
import TabPanel from 'containers/common/components/TabPanel';
import {
  chatRoomPaperStyles,
  chatRoomTabStyles,
  chatRoomTabsWrapperStyles,
} from 'styles/mui/containers/chatRoomsStyles';
import {
  useLazyGetChatListQuery,
  useLazyGetArchivedChatListQuery,
} from 'services/private/chatRooms';
import { useChatContext } from '../contexts/chatContexts';
import RoomTabLabelCount from './RoomTabLabelCount';
import RoomsListTabPanel from './RoomsListTabPanel';

function Rooms() {
  const [currentValue, setCurrentValue] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsObj = useMemo(() => Object.fromEntries(searchParams), [searchParams]);

  const { selectedChatId } = useChatContext();

  const [getChats, { data }] = useLazyGetChatListQuery();
  const [getArchivedChats, { data: archivedData }] = useLazyGetArchivedChatListQuery();

  useEffect(() => {
    if (currentValue === 0) {
      getChats(searchParamsObj);
    }

    if (currentValue === 1) {
      getArchivedChats(searchParamsObj);
    }
  }, [searchParams, currentValue]);

  const handleTabChange = (event, newValue) => {
    setCurrentValue(newValue);
    setSearchParams({ archived: newValue === 1 });
  };

  return (
    <Grid item xs={6} lg={4} xl={3} order={{ xs: 1, lg: 1 }}>
      <Paper sx={chatRoomPaperStyles(selectedChatId)}>
        <Tabs
          variant="scrollable"
          sx={chatRoomTabsWrapperStyles}
          value={currentValue}
          onChange={handleTabChange}
          scrollButtons="auto"
          TabIndicatorProps={{ hidden: true }}
          allowScrollButtonsMobile
        >
          <Tab
            label={(
              <RoomTabLabelCount
                isActive={currentValue === 0}
                label="Chats"
                count={data?.count}
              />
            )}
            wrapped
            sx={chatRoomTabStyles}
          />

          <Tab
            label={(
              <RoomTabLabelCount
                isActive={currentValue === 1}
                label="Archived"
                count={archivedData?.count}
              />
            )}
            wrapped
            sx={chatRoomTabStyles}
          />
        </Tabs>

        <Divider />

        <TabPanel index={0} stateValue={currentValue}>
          <RoomsListTabPanel isArchived={false} data={data} />
        </TabPanel>

        <TabPanel index={1} stateValue={currentValue}>
          <RoomsListTabPanel isArchived data={archivedData} />
        </TabPanel>
      </Paper>
    </Grid>
  );
}

export default memo(Rooms);
