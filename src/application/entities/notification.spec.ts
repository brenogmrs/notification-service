import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('nova notificação');
    const notification = new Notification({
      content,
      category: 'social',
      recipientId: 'recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
