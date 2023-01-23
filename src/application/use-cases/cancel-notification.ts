import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationsReporitory } from '../repositories/notification-repository';
import { NotificationNotFound } from './errors/notification-not-found-error';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsReporitory) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
