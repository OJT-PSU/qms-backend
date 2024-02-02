import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { PrismaService } from '../prisma.service';
import { Queue } from '@prisma/client';

const mockCustomer: Queue[] = [
  {
    queueId: 1,
    name: 'Audrey Hall',
    email: 'audrey@gmail.com',
    contactNumber: '09123456789',
    queueStatus: 'waiting',
    createdAt: new Date('2024-01-31T06:43:45.698Z'),
  },
  {
    queueId: 2,
    name: 'Fors Wall',
    email: 'fors@gmail.com',
    contactNumber: '09123456781',
    queueStatus: 'accommodated',
    createdAt: new Date('2024-01-31T07:47:35.237Z'),
  },
  {
    queueId: 5,
    name: 'Klein Moretti',
    email: 'klein@gmail.com',
    contactNumber: '09123456787',
    queueStatus: 'ongoing',
    createdAt: new Date('2024-01-31T09:47:35.237Z'),
  },
];

const db = {
  queue: {
    findMany: jest.fn(),
    create: jest.fn().mockResolvedValueOnce(mockCustomer[0]),
  },
};

describe('QueueService', () => {
  let service: QueueService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<QueueService>(QueueService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createQueueCustomer', () => {
    it('should create a queue customer', async () => {
      const data = {
        name: 'Audrey Hall',
        email: 'audrey@gmail.com',
        contactNumber: '09123456789',
      };

      const response = await service.createQueueCustomer(data);
      expect(response).toBe(mockCustomer[0]);
    });
  });

  describe('findQueueCustomers', () => {
    it('should return an array of all queue customers', async () => {
      jest.spyOn(prisma.queue, 'findMany').mockResolvedValueOnce(mockCustomer);

      const response = await service.findAllQueueCustomers();
      expect(response).toBeInstanceOf(Array);
      expect(response).toBe(mockCustomer);
    });

    it('should return an array of only waiting customers', async () => {
      jest
        .spyOn(prisma.queue, 'findMany')
        .mockResolvedValueOnce([mockCustomer[0]]);

      const response = await service.findFilteredQueueCustomers('waiting');
      expect(response).toBeInstanceOf(Array);
      expect(response).toStrictEqual([mockCustomer[0]]);
    });

    it('should return an array of only finished customers', async () => {
      jest
        .spyOn(prisma.queue, 'findMany')
        .mockResolvedValueOnce([mockCustomer[1]]);

      const response = await service.findFilteredQueueCustomers('accommodated');
      expect(response).toBeInstanceOf(Array);
      expect(response).toStrictEqual([mockCustomer[1]]);
    });

    it('should return an array of only ongoing customers', async () => {
      jest
        .spyOn(prisma.queue, 'findMany')
        .mockResolvedValueOnce([mockCustomer[2]]);

      const response = await service.findFilteredQueueCustomers('ongoing');
      expect(response).toBeInstanceOf(Array);
      expect(response).toStrictEqual([mockCustomer[2]]);
    });
  });
});
