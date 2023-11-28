import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useChatContext } from '../contexts/chatContexts';

function useChatList(data) {
  const [chatRooms, setChatRooms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsObj = useMemo(() => Object.fromEntries(searchParams), [searchParams]);
  const { setSelectedChatId, setFeedback } = useChatContext();
  const isFilters = useMemo(() => searchParams.get('filters'), [searchParams]);

  const handlePageChange = (e, newValue) => {
    setSearchParams({ ...searchParamsObj, page: newValue + 1 });
    setPage(newValue);
  };

  const handleRowsPerPageChange = e => {
    const value = parseInt(e?.target?.value, 10);
    setRowsPerPage(value);
    setPage(0);
    const newParams = { ...searchParamsObj };
    delete newParams.page;
    setSearchParams({ ...newParams, limit: value });
  };

  // ON SEARCH RESET
  useEffect(() => {
    if (searchParams.size === 0) {
      setPage(0);
    }
  }, [searchParams]);

  useEffect(() => {
    // const filterType = searchParams.get('archived');
    // if (page === 1) {
    //   const chatRoom = chatsData.results[0];
    //   setChatRooms(chatsData.results);
    //   setSelectedChatId(chatRoom?.id);
    //   setFeedback({
    //     rating: chatRoom?.feedback_rating,
    //     text: chatRoom?.feedback_text,
    //     time: chatRoom?.chat_started_at,
    //     chatName: chatRoom?.name,
    //   });
    // }

    // if (page > 1 && searchParams.size > 0) {
    //   setChatRooms(prevState => [...prevState, ...chatsData.results]);
    // }

    setChatRooms(data?.results);
    const chatRoom = data?.results?.length > 0 ? data?.results[0] : {};
    setSelectedChatId(chatRoom?.id);
    setFeedback({
      rating: chatRoom?.feedback_rating,
      text: chatRoom?.feedback_text,
      time: chatRoom?.chat_started_at,
      chatName: chatRoom?.name,
    });
  }, [page, data, isFilters]);

  return {
    chatRooms,
    handlePageChange,
    page,
    rowsPerPage,
    handleRowsPerPageChange,
  };
}

export default useChatList;
