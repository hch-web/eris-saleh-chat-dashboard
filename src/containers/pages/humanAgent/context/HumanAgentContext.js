import { createContext, useContext } from 'react';

export const HumanAgentContext = createContext({
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  selectedId: null,
  selectedRoom: null,
  chatMessages: [],
  setChatMessages: () => {},
});

export const useHumanAgentContext = () => {
  const context = useContext(HumanAgentContext);

  return context;
};
