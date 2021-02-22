import { Module } from '@nestjs/common';
import { AuthBackendServiceModule } from '@jellyblog-nx/auth/backend/service';
import { PassportModule } from '@nestjs/passport';
import { AuthBackendController } from './auth-backend.controller';

@Module({
  controllers: [AuthBackendController],
  providers: [],
  exports: [],
  imports: [PassportModule, AuthBackendServiceModule],
})
export class AuthBackendControllerModule {
}
