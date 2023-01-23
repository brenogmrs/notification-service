import { NotificationsReporitory } from '@application/repositories/notification-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsReporitory,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsReporitory],
})
export class DatabaseModule {}
