import { NotFoundException } from '@nestjs/common';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { CancelNotification } from './cancel-notification';

describe('cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const newNotification = new Notification({
      recipientId: 'recipient-id',
      category: 'social',
      content: new Content('this might be a notification'),
    });

    await notificationsRepository.create(newNotification);

    await cancelNotification.execute({ notificationId: newNotification.id });

    expect(notificationsRepository.notifications[0].caceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non-existing notification ', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({ notificationId: 'fake-id' });
    }).rejects.toThrow(NotFoundException);
  });
});
