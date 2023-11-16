import React, { useState } from 'react';
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Tabs,
} from '@mui/material';

// COMPONENTS & STYLES
import {
  useGetArchivedChatListQuery,
  useGetChatListQuery,
} from 'services/private/chatRooms';
import TabPanel from 'containers/common/components/TabPanel';
import {
  chatRoomPaperStyles,
  chatRoomsTabPanelWrapperStyles,
  chatRoomTabStyles,
  chatRoomTabsWrapperStyles,
} from 'styles/mui/containers/chatRoomsStyles';
import RoomCard from './RoomCard';
import { useChatContext } from '../contexts/chatContexts';

function Rooms() {
  const [currentValue, setCurrentValue] = useState(0);
  const { setSelectedChatId, setFeedback, selectedChatId } = useChatContext();

  const { data: chatsData } = useGetChatListQuery();
  const { data: archivedData } = useGetArchivedChatListQuery();

  const handleChange = (event, newValue) => {
    setCurrentValue(newValue);
  };

  const handleClickRoom = chatRoom => {
    setFeedback({
      rating: chatRoom?.feedback_rating,
      text: chatRoom?.feedback_text,
      time: chatRoom?.chat_started_at,
      chatName: chatRoom?.name,
    });
    setSelectedChatId(chatRoom.id);
  };

  return (
    <Grid item xs={6} lg={4} xl={3} order={{ xs: 1, lg: 1 }}>
      <Paper sx={chatRoomPaperStyles(selectedChatId)}>
        <Tabs
          variant="scrollable"
          sx={chatRoomTabsWrapperStyles}
          value={currentValue}
          onChange={handleChange}
          scrollButtons="auto"
          TabIndicatorProps={{ hidden: true }}
          allowScrollButtonsMobile
        >
          <Tab label="Chats" wrapped sx={chatRoomTabStyles} />

          <Tab label="Archived" wrapped sx={chatRoomTabStyles} />
        </Tabs>

        <Divider />

        <TabPanel index={0} stateValue={currentValue}>
          <Box sx={chatRoomsTabPanelWrapperStyles(selectedChatId)}>
            <List className="d-flex flex-column align-items-start">
              {chatsData?.length === 0 && (
                <ListItem>
                  <ListItemText primary="No chats available" />
                </ListItem>
              )}

              {chatsData?.results?.map(item => (
                <RoomCard
                  name={item?.name}
                  lastMessage={item?.chat_last_message}
                  chatDate={item?.chat_started_at}
                  key={item.id}
                  isArchived={false}
                  handleClick={handleClickRoom}
                  roomDetails={item}
                />
              ))}
            </List>
          </Box>
        </TabPanel>

        <TabPanel index={1} stateValue={currentValue}>
          <Box sx={chatRoomsTabPanelWrapperStyles(selectedChatId)}>
            <List className="d-flex flex-column align-items-start">
              {archivedData?.length === 0 && (
                <ListItem>
                  <ListItemText primary="No chats available" />
                </ListItem>
              )}

              {archivedData?.results?.map(item => (
                <RoomCard
                  name={item?.name}
                  lastMessage={item?.chat_last_message}
                  chatDate={item?.chat_started_at}
                  key={item.id}
                  isArchived
                  handleClick={handleClickRoom}
                  roomDetails={item}
                />
              ))}
            </List>
          </Box>
        </TabPanel>
      </Paper>
    </Grid>
  );
}

export default Rooms;
