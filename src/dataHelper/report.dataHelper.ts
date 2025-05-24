export interface Report {
  itemId: number;
  itemType: string;
  message: string;
  id: number;
  userId: number;
  username: string;
  userEmail: string;
  createDate: string;
  isRead: boolean;
}

export interface ReportCreate {
  cardId: number;
  content: string;
}

export interface ReportCreateResponse {
  itemId: number;
  itemType: string;
  message: string;
  id: number | null;
}

export interface ReportMessage {
  reportId: number;
  reportContent: string;
  itemId: number;
  itemType: string;
  userId: number;
  userName: string;
  userEmail: string;
  createDate: string;
  isRead: boolean;
}

export interface NotificationMessage {
  type: string;
  message: ReportMessage;
  timestamp: number;
  userId: string;
  reportId: string;
} 
