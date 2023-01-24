import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('find recipient notifications', () => {
  it('should be able to find notifications from a certain recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await countRecipientNotification.execute({
      recipientId: 'recipient-id',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id' }),
        expect.objectContaining({ recipientId: 'recipient-id' }),
      ]),
    );
  });
});
