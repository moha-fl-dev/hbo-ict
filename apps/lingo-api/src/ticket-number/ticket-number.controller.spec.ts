import { Test, TestingModule } from '@nestjs/testing';
import { TicketNumberController } from './ticket-number.controller';
import { TicketNumberService } from './ticket-number.service';

describe('TicketNumberController', () => {
  let controller: TicketNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketNumberController],
      providers: [TicketNumberService],
    }).compile();

    controller = module.get<TicketNumberController>(TicketNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
