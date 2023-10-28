import { Test, TestingModule } from '@nestjs/testing';
import { TicketNumberService } from './ticket-number.service';

describe('TicketNumberService', () => {
  let service: TicketNumberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketNumberService],
    }).compile();

    service = module.get<TicketNumberService>(TicketNumberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
