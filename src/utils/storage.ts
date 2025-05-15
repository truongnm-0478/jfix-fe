import { STORAGE_VAR } from "@/constant";
import { MessageProps } from "@/dataHelper/communication.dateHelper";

interface User {
  username: string | null;
  role: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  avatar?: string | null;
}

export const getAccessToken = () => {
  return sessionStorage.getItem(STORAGE_VAR.AccessToken);
};

export const setAccessToken = (token: string) => {
  sessionStorage.setItem(STORAGE_VAR.AccessToken, token);
};

export const removeAccessToken = () => {
  sessionStorage.removeItem(STORAGE_VAR.AccessToken);
};

export const getRefreshToken = () => {
  return sessionStorage.getItem(STORAGE_VAR.RefreshToken);
};

export const setRefreshToken = (token: string) => {
  sessionStorage.setItem(STORAGE_VAR.RefreshToken, token);
};

export const removeRefreshToken = () => {
  sessionStorage.removeItem(STORAGE_VAR.RefreshToken);
};

export const revokeAllTokens = () => {
  removeAccessToken();
  removeRefreshToken();
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem(STORAGE_VAR.User, JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_VAR.User);
  return user ? JSON.parse(user) : null;
};

export const removeCurrentUser = () => {
  localStorage.removeItem(STORAGE_VAR.User);
};

export const getLanguageStorage = () => {
  return localStorage.getItem(STORAGE_VAR.Language);
};

export const setLanguageStorage = (lang: string) => {
  localStorage.setItem(STORAGE_VAR.Language, lang);
};

export const getJapaneseListeningExerciseState = () => {
  return localStorage.getItem(STORAGE_VAR.JapaneseListeningExerciseState);
};

export const setJapaneseListeningExerciseState = (state: string) => {
  localStorage.setItem(STORAGE_VAR.JapaneseListeningExerciseState, state);
};

export const removeJapaneseListeningExerciseState = () => {
  localStorage.removeItem(STORAGE_VAR.JapaneseListeningExerciseState);
};

export const setChatTopic = (topic: { japaneseText: string; level: string } | null) => {
  localStorage.setItem(STORAGE_VAR.JapaneseChatTopic, JSON.stringify(topic));
};

export const getChatTopic = () => {
  return localStorage.getItem(STORAGE_VAR.JapaneseChatTopic);
};

export const removeChatTopic = () => {
  localStorage.removeItem(STORAGE_VAR.JapaneseChatTopic);
};

export const setChatMessages = (messages: MessageProps['message'][]) => {
  localStorage.setItem(STORAGE_VAR.JapaneseChatMessages, JSON.stringify(messages));
};

export const getChatMessages = () => {
  return localStorage.getItem(STORAGE_VAR.JapaneseChatMessages);
};

export const removeChatMessages = () => {
  localStorage.removeItem(STORAGE_VAR.JapaneseChatMessages);
};