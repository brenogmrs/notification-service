import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'recipient-id-two',
    category: 'social',
    content: new Content('this might be a notification'),
    ...override,
  });
}
