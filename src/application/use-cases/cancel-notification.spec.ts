import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found-error';

describe('cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const newNotification = makeNotification();

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
    }).rejects.toThrow(NotificationNotFound);
  });
});
