import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Paper, TablePagination } from '@mui/material';

import { useGetHumanAgentChatsQuery } from 'services/private/humanAgent';
import { chatListWrapperStyles } from 'styles/mui/containers/humanAgentStyles';
import ChatCard from './ChatCard';
import { useHumanAgentContext } from '../context/HumanAgentContext';

function ChatLists() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const { selectedId, setSearchParams } = useHumanAgentContext();

  const { data: chatRooms } = useGetHumanAgentChatsQuery({ page, limit: rowsPerPage });

  const handleClickRoom = (id, room) => {
    setSearchParams({ i: id, rid: room });
  };

  const handlePageChange = (e, newValue) => {
    setPage(newValue);
  };

  const handleRowsPerPageChange = e => {
    setRowsPerPage(e?.target?.value);
    setPage(0);
  };

  return (
    <Paper sx={chatListWrapperStyles}>
      <List className="d-flex flex-column align-items-start">
        {chatRooms?.results?.length === 0 && (
          <ListItem>
            <ListItemText primary="No chats available" />
          </ListItem>
        )}

        {chatRooms?.results?.map(item => (
          <ChatCard
            name={item?.name || 'NA'}
            lastMessage={item?.chat_last_message || '-'}
            chatDate={item?.chat_started_at}
            key={item.id}
            isArchived={false}
            handleClick={handleClickRoom}
            roomDetails={item}
            isSelected={+selectedId === item?.id}
          />
        ))}
      </List>

      <TablePagination
        sx={{ '& p': { margin: 0 } }}
        component={Box}
        count={chatRooms?.count || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[15, 30, 50, 100]}
      />
    </Paper>
  );
}

export default ChatLists;
