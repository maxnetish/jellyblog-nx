import { Test } from '@nestjs/testing';
import { AuthBackendController } from './auth-backend.controller';

describe('AuthBackendControllerController', () => {
  let controller: AuthBackendController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [AuthBackendController],
    }).compile();

    controller = module.get(AuthBackendController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
