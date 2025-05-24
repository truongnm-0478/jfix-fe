  import { NotificationMessage as NotificationPayload } from '@/dataHelper/report.dataHelper';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class SocketService {
  private stompClient: any;
  private connected: boolean = false;
  private adminNotificationHandler: ((notification: NotificationPayload) => void) | null = null;
  private userNotificationHandler: ((notification: NotificationPayload) => void) | null = null;

  connect(onConnect: () => void, onError: (error: Error) => void) {
    try {
      const wsUrl = import.meta.env.VITE_WS_URL;
      const socket = new SockJS(wsUrl);
      
      this.stompClient = Stomp.over(() => socket);
      this.stompClient.debug = () => {};
      
      this.stompClient.connect(
        {},
        () => {
          this.connected = true;
          onConnect();
        },
        (error: Error) => {
          this.connected = false;
          onError(error);
        }
      );
    } catch (error) {
      onError(error as Error);
    }
  }

  subscribeToAdminNotifications(handler: (notification: NotificationPayload) => void) {
    if (!this.connected || !this.stompClient) {
      return;
    }

    this.adminNotificationHandler = handler;
    this.stompClient.subscribe('/topic/admin-notifications', (message: { body: string }) => {
      try {
        const notification = JSON.parse(message.body) as NotificationPayload;
        handler(notification);
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    });
  }

  unsubscribeFromAdminNotifications() {
    if (!this.connected || !this.stompClient || !this.adminNotificationHandler) {
      return;
    }

    try {
      this.stompClient.unsubscribe('/topic/admin-notifications');
    } catch (error) {
      console.error('Error unsubscribing from admin notifications:', error);
    }
    this.adminNotificationHandler = null;
  }

  subscribeToUserNotifications(userId: string, handler: (notification: NotificationPayload) => void) {
    if (!this.connected || !this.stompClient) {
      return;
    }

    this.userNotificationHandler = handler;
    this.stompClient.subscribe(`/topic/user-notifications/${userId}`, (message: { body: string }) => {
      try {
        const notification = JSON.parse(message.body) as NotificationPayload;
        handler(notification);
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    });
  }

  unsubscribeFromUserNotifications(userId: string) {
    if (!this.connected || !this.stompClient || !this.userNotificationHandler) {
      return;
    }

    try {
      this.stompClient.unsubscribe(`/topic/user-notifications/${userId}`);
    } catch (error) {
      console.error('Error unsubscribing from user notifications:', error);
    }
    this.userNotificationHandler = null;
  }

  disconnect() {
    if (this.stompClient) {
      try {
        this.stompClient.disconnect();
      } catch (error) {
        console.error('Error disconnecting socket:', error);
      }
      this.stompClient = null;
      this.connected = false;
      this.adminNotificationHandler = null;
      this.userNotificationHandler = null;
    }
  }

  isConnected() {
    return this.connected;
  }
}

export const socketService = new SocketService(); 