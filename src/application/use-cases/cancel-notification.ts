import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationsReporitory } from '../repositories/notification-repository';

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

    const foundNotification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!foundNotification) {
      throw new NotFoundException('Notification not found');
    }
  }
}
