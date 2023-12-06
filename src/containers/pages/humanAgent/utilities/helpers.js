export const handleAddHumanAgentDivider = data => {
  const sortedMessages = [...data].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  const humanAgentChatIdx = sortedMessages.findIndex(
    message => message?.message_sender === 'Admin' || message?.message_sender === 'Support'
  );

  if (sortedMessages?.length > 0 && humanAgentChatIdx > 1) {
    sortedMessages.splice(humanAgentChatIdx, 0, {
      type: 'DIVIDER',
      message: 'Human Agent Connected',
    });
  }

  return sortedMessages;
};

export const test = '';
