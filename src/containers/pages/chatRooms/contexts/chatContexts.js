import { createContext, useContext } from 'react';

export const ChatContext = createContext({
  feedback: {
    rating: 0,
    text: '',
    time: '',
    chatName: '',
  },
  setFeedback: () => {},
  selectedChatId: null,
  setSelectedChatId: () => {},
});

export const useChatContext = () => {
  const context = useContext(ChatContext);

  return context;
};
