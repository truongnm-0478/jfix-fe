import { MAX_MESSAGES } from "@/constant";
import { MessageProps } from "@/dataHelper/communication.dateHelper";
import { getChatMessages, getChatTopic, removeChatMessages, removeChatTopic, setChatMessages, setChatTopic } from "@/utils/storage";

const prepareMessageForStorage = (message: MessageProps['message']) => {
  const { audio, ...messageWithoutAudio } = message;
  return messageWithoutAudio;
};

export const saveChatMessages = (messages: MessageProps['message'][]) => {
  try {
    const messagesForStorage = messages
      .slice(-MAX_MESSAGES)
      .map(prepareMessageForStorage);

    setChatMessages(messagesForStorage);
  } catch (error) {
    try {
      setChatMessages([]);
    } catch (innerError) {
      console.error('Failed to clear chat storage:', innerError);
    }
  }
};

export const getChatMessagesFromStorage = (): MessageProps['message'][] => {
  try {
    const stored = getChatMessages();
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading chat messages:', error);
    return [];
  }
};

export const saveChatTopic = (topic: { japaneseText: string; level: string } | null) => {
  try {
    if (topic) {
      setChatTopic(topic);
    }
  } catch (error) {
    console.error('Error saving chat topic:', error);
  }
};

export const getChatTopicFromStorage = () => {
  try {
    const stored = getChatTopic()
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading chat topic:', error);
    return null;
  }
};

export const clearChatStorage = () => {
  try {
    removeChatTopic();
    removeChatMessages();
  } catch (error) {
    console.error('Error clearing chat storage:', error);
  }
}; 