import { Module } from '@nestjs/common';
import { AuthBackendService } from './auth-backend.service';
import { LocalStrategy } from './local-strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';

@Module({
  controllers: [],
  providers: [
    AuthBackendService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
      JwtModule,
      AuthBackendService,
  ],
  imports: [
      JwtModule.register({
        secret: process.env.JWT_SECRET || 'músogköttur',
        signOptions: {
          expiresIn: '60s',
        },
      }),
  ],
})
export class AuthBackendServiceModule {
}
