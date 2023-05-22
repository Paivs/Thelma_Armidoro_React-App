import * as Notifications from 'expo-notifications';

class NotificationService {
  async scheduleNotification(title, body, seconds) {
    const trigger = {
      seconds: seconds,
    };

    const content = {
      title,
      body,
      sound: true,
      vibrate: true,
      android: {
        channelId: 'default',
        priority: 'high',
        sticky: false,
        color: 'red',
      },
      ios: {
        sound: true,
      },
    };

    const schedulingOptions = {
      time: (new Date()).getTime() + seconds * 1000,
    };

    setTimeout(() => {
      Notifications.scheduleNotificationAsync({
        content,
        trigger,
      });
    }, seconds * 1000);
  }
}

export default new NotificationService();
