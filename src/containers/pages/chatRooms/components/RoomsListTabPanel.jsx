import React from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TablePagination,
} from '@mui/material';
import propTypes from 'prop-types';

import { chatRoomsTabPanelWrapperStyles } from 'styles/mui/containers/chatRoomsStyles';
import { useChatContext } from '../contexts/chatContexts';
import RoomCard from './RoomCard';
import useChatList from '../customHooks/useChatList';

function RoomsListTabPanel({ data, isFetching, isArchived }) {
  const { setFeedback, selectedChatId, setSelectedChatId } = useChatContext();

  const { chatRooms, page, handlePageChange, handleRowsPerPageChange, rowsPerPage } = useChatList(data);

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
    <Box sx={chatRoomsTabPanelWrapperStyles(selectedChatId)}>
      <List className="d-flex flex-column align-items-start">
        {chatRooms?.length === 0 && (
          <ListItem>
            <ListItemText primary="No chats available" />
          </ListItem>
        )}

        {chatRooms?.map(item => (
          <RoomCard
            name={item?.name}
            lastMessage={item?.chat_last_message}
            chatDate={item?.chat_started_at}
            key={item.id}
            isArchived={isArchived}
            handleClick={handleClickRoom}
            roomDetails={item}
          />
        ))}
      </List>

      <TablePagination
        sx={{ '& p': { margin: 0 } }}
        component={Box}
        count={data?.count || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[15, 30, 50, 100]}
      />

      <Backdrop sx={{ zIndex: 9999 }} open={isFetching}>
        <CircularProgress size={90} color="whiteColor" />
      </Backdrop>
    </Box>
  );
}

RoomsListTabPanel.propTypes = {
  data: propTypes.object,
  isFetching: propTypes.bool,
  isArchived: propTypes.bool,
  // page: propTypes.number,
  // rowsPerPage: propTypes.number,
  // handlePageChange: propTypes.func,
  // handleRowsPerPageChange: propTypes.func,
};

RoomsListTabPanel.defaultProps = {
  data: null,
  isFetching: false,
  isArchived: false,
  // page: 0,
  // rowsPerPage: 15,
  // handlePageChange: () => {},
  // handleRowsPerPageChange: () => {},
};

export default RoomsListTabPanel;
