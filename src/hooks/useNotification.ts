import { toast } from '@/components/ui/sonner';
import { NotificationMessage } from '@/dataHelper/report.dataHelper';
import { socketService } from '@/services/socket/socket.service';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface NotificationProps {
  isAdmin?: boolean;
  userId?: string;
}

export const useNotification = ({ isAdmin = false, userId }: NotificationProps) => {
  const { t } = useTranslation();

  const handleNotification = useCallback((notification: NotificationMessage) => {
    console.log('notification', notification);
    
    switch (notification.type) {
      case 'NEW_REPORT':
        toast(t('notification.newReport'), {
          description: `${notification.message.userName} ${t('notification.report')} ${notification.message.itemType} - ID: ${notification.message.itemId}. ${t('notification.content')}: ${notification.message.reportContent}`,
          action: {
            label: t('notification.viewDetail'),
            onClick: () => window.location.href = `/admin/notifications?reportId=${notification.message.reportId}`
          },
          duration: 5000,
        });
        break;
        
      case 'REPORT_STATUS_UPDATE':
        toast(t('notification.reportStatusUpdate'), {
          description: notification.message.reportContent,
          duration: 4000,
        });
        break;
        
      default:
        toast(t('notification.title'), {
          description: notification.message.reportContent,
        });
    }
  }, []);

  useEffect(() => {
    socketService.connect(
      () => {
        if (isAdmin) {
          socketService.subscribeToAdminNotifications(handleNotification);
        }
        if (userId) {
          socketService.subscribeToUserNotifications(userId, handleNotification);
        }
      },
      (error) => {
        console.log('Connection error:', error);
        toast.error(t('notification.connectionError'), {
          description: t('notification.connectionErrorDescription'),
          duration: 3000,
        });
      }
    );

    return () => {
      if (isAdmin) {
        socketService.unsubscribeFromAdminNotifications();
      }
      if (userId) {
        socketService.unsubscribeFromUserNotifications(userId);
      }
      socketService.disconnect();
    };
  }, [isAdmin, userId, handleNotification]);
}; 