import LoadingDots from '@/components/common/LoadingDots';
import { MAX_MESSAGES } from '@/constant';
import { FreeTalkResponse } from '@/dataHelper/ai.dataHelper';
import { Message, MessageProps } from '@/dataHelper/communication.dateHelper';
import { Content } from '@/dataHelper/study.dataHelper';
import { Check, MessageSquare, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { clearChatStorage, getChatMessagesFromStorage, getChatTopicFromStorage, saveChatMessages, saveChatTopic } from '../helper';
import { AudioRecorder } from './AudioRecorder';
import { MessageDisplay } from './MessageDisplay';

interface JapaneseChatProps {
  onSpeechToText: (audioBlob: Blob) => void;
  onSendMessage: (freeTalkResquest: Message) => void;
  onEndConversation: () => void;
  currentTopic: Content | null;
  aiMessage: FreeTalkResponse | null;
  isLoading: boolean;
  isCompleted: boolean;
  speechToText: string | null;
  onNextConversation: () => void;
}

export const JapaneseChat = ({ 
  onSpeechToText, 
  onSendMessage, 
  onEndConversation, 
  currentTopic, 
  aiMessage, 
  isLoading, 
  isCompleted,
  speechToText,
  onNextConversation
}: JapaneseChatProps) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<MessageProps['message'][]>(() => getChatMessagesFromStorage());
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef(0);

  useEffect(() => {
    const storedTopic = getChatTopicFromStorage();
    if (currentTopic && (!storedTopic || storedTopic.japaneseText !== currentTopic.japaneseText)) {
      setMessages([]);
      messageCounterRef.current = 0;
      saveChatTopic({
        japaneseText: currentTopic.japaneseText ?? '',
        level: currentTopic.level ?? ''
      });
      saveChatMessages([]);
    }
  }, [currentTopic]);

  const generateMessageId = () => {
    messageCounterRef.current += 1;
    return `${Date.now()}-${messageCounterRef.current}`;
  };

  useEffect(() => {
    if (speechToText) {
      setInputText(speechToText);
    }
  }, [speechToText]);

  useEffect(() => {
    if (aiMessage?.data?.response?.reply) {
      setMessages(prevMessages => {
        const newMessages = [...prevMessages,
          { 
            id: generateMessageId(), 
            sender: 'bot' as const, 
            text: aiMessage.data.response.reply,
            correction: aiMessage.data.response.correction,
            vocabulary: aiMessage.data.response.vocabulary,
            audio: aiMessage.data.response.audio_reply
          }];
        saveChatMessages(newMessages);
        return newMessages;
      });
    }
  }, [aiMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading || isCompleted) return;    
    
    setMessages(prevMessages => {
      const newMessages = [...prevMessages, {
        id: generateMessageId(),
        sender: 'user' as const,
        text: text.trim()
      }];
      saveChatMessages(newMessages);
      return newMessages;
    });
    
    setInputText('');
    
    onSendMessage({ 
      theme: currentTopic?.japaneseText ?? '', 
      level: currentTopic?.level ?? '', 
      user_input: text 
    });
  };

  const handleAudioRecording = async (audioBlob: Blob) => {
    setInputText('');
    onSpeechToText(audioBlob);
  };

  const handleEndConversation = async () => {
    clearChatStorage();
    onEndConversation();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageSquare size={24} />
            <h1 className="text-xl font-bold">{t("learn_communication.learn_communication_title")}</h1>
          </div>
          {messages.length > 0 && (
            <span className="text-sm bg-primary px-2 py-1 rounded-full">
              {Math.min(messages.length, MAX_MESSAGES * 2)} / {MAX_MESSAGES * 2}
            </span>
          )}
        </div>
        <p className="text-sm mt-1">{t("learn_communication.learn_communication_topic")}: {currentTopic?.japaneseText}</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length > 0 && (
          <>
            {messages.map((message) => (
              <MessageDisplay key={message.id} message={message} />
            ))}
          </>
        )}
        
        {isLoading && (
           <div className="p-4">
             <LoadingDots />
         </div>
        )}
        
        {isCompleted && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
            <Check className="mx-auto mb-2 text-green-500" size={32} />
            <p className="text-green-700 font-medium">{t("learn_communication.conversation_completed")}</p>
            <p className="text-green-600 text-sm mt-1">{t("learn_communication.conversation_completed_description")}</p>
            <button
              onClick={onNextConversation}
              className="px-2 mt-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {t("learn_communication.next_conversation")}
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
              placeholder={isLoading ? t("learn_communication.loading") : t("learn_communication.input")}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-light"
              disabled={isLoading || isCompleted}
            />
          </div>
          
          <AudioRecorder 
            onRecordingComplete={handleAudioRecording} 
          />
          
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isLoading || isCompleted}
            className="p-3 bg-primary text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={24} />
          </button>
        </div>
        
        {!isCompleted && messages.length >= MAX_MESSAGES * 2 - 2 && (
          <button
            onClick={handleEndConversation}
            className="w-full mt-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            {t("learn_communication.end_conversation")}
          </button>
        )}
      </div>
    </div>
  );
};

export default JapaneseChat;