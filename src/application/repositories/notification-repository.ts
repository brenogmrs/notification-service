import { Notification } from '../entities/notification';

export abstract class NotificationsReporitory {
  abstract create(notification: Notification): Promise<void>;
}
