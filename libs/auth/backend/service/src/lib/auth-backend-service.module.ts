import { Module } from '@nestjs/common';
import { AuthBackendService } from './auth-backend.service';
import { LocalStrategy } from './local-strategy.service';

@Module({
  controllers: [],
  providers: [
    AuthBackendService,
    LocalStrategy,
  ],
  exports: [],
  imports: [],
})
export class AuthBackendServiceModule {
}
