import { useEffect, useRef } from 'react';
import { getChatSocketURL } from 'utilities/constants';
import { useHumanAgentContext } from '../context/HumanAgentContext';

const useHumanAgentChat = () => {
  const { setChatMessages, selectedRoom, chatMessages } = useHumanAgentContext();
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(getChatSocketURL(selectedRoom));
    socketRef.current = socket;

    socket.onmessage = ev => {
      const data = JSON.parse(ev.data);

      setChatMessages(prevState => [...prevState, data]);
    };
  }, [selectedRoom]);

  useEffect(() => {
    if (chatMessages?.length > 0) {
      const endMsgEl = document.getElementById('_end_message_block');
      endMsgEl?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return socketRef;
};

export default useHumanAgentChat;
