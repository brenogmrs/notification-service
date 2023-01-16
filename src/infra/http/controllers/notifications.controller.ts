import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '../../../application/use-cases/send-notification';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() data: CreateNotificationDTO) {
    const { content, category, recipientId } = data;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification };
  }
}
