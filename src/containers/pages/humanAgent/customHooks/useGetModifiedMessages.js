import { useEffect } from 'react';
import { useHumanAgentContext } from '../context/HumanAgentContext';
import { handleAddHumanAgentDivider } from '../utilities/helpers';

const useGetModifiedMessages = data => {
  const { chatMessages, setChatMessages } = useHumanAgentContext();

  useEffect(() => {
    if (data?.results) {
      const sortedMessages = handleAddHumanAgentDivider(data.results);

      setChatMessages(sortedMessages);
    }
  }, [data]);

  return chatMessages;
};

export default useGetModifiedMessages;
