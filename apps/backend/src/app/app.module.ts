import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthBackendControllerModule } from '@jellyblog-nx/auth/backend/controller';

@Module({
  imports: [AuthBackendControllerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
