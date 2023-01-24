import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('count recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-id' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-id-two' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-id',
    });

    expect(count).toEqual(2);
  });
});
