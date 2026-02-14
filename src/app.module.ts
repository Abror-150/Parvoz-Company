import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './stats/company/company.module';
import { ServiceModule } from './servicee/service.module';
import { OrderModule } from './order/order.module';
import { ProjectModule } from './project/project.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    CompanyModule,
    ServiceModule,
    OrderModule,
    ProjectModule,
    ContactMessagesModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
