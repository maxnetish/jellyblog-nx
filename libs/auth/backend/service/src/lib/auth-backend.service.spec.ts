import { Test } from '@nestjs/testing';
import { AuthBackendService } from './auth-backend.service';

describe('AuthBackendServiceService', () => {
  let service: AuthBackendService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthBackendService],
    }).compile();

    service = module.get(AuthBackendService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
