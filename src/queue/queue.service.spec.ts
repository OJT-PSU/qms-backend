import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';

describe('QueueService', () => {
  let service: QueueService;
  const mockCustomer = [
    {
      name: 'Audrey Hall',
      email: 'audreyhall@gmail.com',
      number: '09123456789',
      queueStatus: 'Finished',
    },
    {
      name: 'Fors Wall',
      email: 'forswall@gmail.com',
      number: '09123456788',
      queueStatus: 'Waiting',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueService],
    }).compile();

    service = module.get<QueueService>(QueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findQueueCustomers', () => {
    it('should return an array of all queue customers', async () => {
      const response = await service.findQueueCustomers();
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe(mockCustomer);
    });

    it('should return an array of only waiting customers', async () => {
      const response = await service.findQueueCustomers('Waiting');
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe([mockCustomer[1]]);
    });

    it('should return an array of only finished customers', async () => {
      const response = await service.findQueueCustomers('Finished');
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe([mockCustomer[0]]);
    });
  });
});
