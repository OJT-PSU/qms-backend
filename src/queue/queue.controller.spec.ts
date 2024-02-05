import { Test, TestingModule } from '@nestjs/testing';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { Queue } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CreateQueueDto } from './dto/create-queue.dto';
import { validate } from 'class-validator';

const mockCustomer: Queue[] = [
  {
    queueId: 1,
    name: 'Audrey Hall',
    email: 'audrey@gmail.com',
    contactNumber: '09123456789',
    queueStatus: 'waiting',
    createdAt: new Date('2024-01-31T06:43:45.698Z'),
    terminal: null,
  },
  {
    queueId: 2,
    name: 'Fors Wall',
    email: 'fors@gmail.com',
    contactNumber: '09123456781',
    queueStatus: 'accommodated',
    createdAt: new Date('2024-01-31T07:47:35.237Z'),
    terminal: null,
  },
  {
    queueId: 5,
    name: 'Klein Moretti',
    email: 'klein@gmail.com',
    contactNumber: '09123456787',
    queueStatus: 'ongoing',
    createdAt: new Date('2024-01-31T07:47:35.237Z'),
    terminal: null,
  },
];

describe('QueueController', () => {
  let controller: QueueController;
  let service: QueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueController],
      providers: [
        {
          provide: QueueService,
          useValue: {
            createQueueCustomer: jest.fn().mockResolvedValue(mockCustomer[0]),
            findAllQueueCustomers: jest
              .fn()
              .mockResolvedValueOnce(mockCustomer),
            findFilteredQueueCustomers: jest.fn(),
            updateQueueCustomer: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QueueController>(QueueController);
    service = module.get<QueueService>(QueueService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllQueueCustomers', () => {
    it('should return an array of customers', async () => {
      jest
        .spyOn(service, 'findAllQueueCustomers')
        .mockResolvedValueOnce(mockCustomer);
      const response = await controller.findAllQueueCustomers();
      expect(response).toStrictEqual(mockCustomer);
    });
  });

  describe('createQueueCustomer', () => {
    it('should create a queue customer', async () => {
      const response = await controller.createQueueCustomer({
        name: 'Audrey Hall',
        email: 'audrey@gmail.com',
        contactNumber: '09123456789',
      });

      expect(response).toBe(mockCustomer[0]);
    });

    it('should not create a customer without name', async () => {
      const queueDto = {
        name: '',
      };

      const ofQueueDto = plainToInstance(CreateQueueDto, queueDto);
      const error = await validate(ofQueueDto);

      expect(error.length).not.toBe(0);
      expect(JSON.stringify(error)).toContain('name should not be empty');
    });
  });

  describe('findFilteredQueueCustomers', () => {
    it('should return only waiting customers', async () => {
      jest
        .spyOn(service, 'findFilteredQueueCustomers')
        .mockImplementationOnce(async () => {
          return [mockCustomer[0]];
        });

      const response = await controller.findFilteredQueueCustomers('waiting');
      expect(service.findFilteredQueueCustomers).toHaveBeenCalledWith(
        'waiting',
      );
      expect(response).toStrictEqual([mockCustomer[0]]);
    });

    it('should return only ongoing customers', async () => {
      jest
        .spyOn(service, 'findFilteredQueueCustomers')
        .mockImplementationOnce(async () => {
          return [mockCustomer[2]];
        });

      const response = await controller.findFilteredQueueCustomers('ongoing');
      expect(service.findFilteredQueueCustomers).toHaveBeenCalledWith(
        'ongoing',
      );
      expect(response).toStrictEqual([mockCustomer[2]]);
    });

    it('should return only accommodated customers', async () => {
      jest
        .spyOn(service, 'findFilteredQueueCustomers')
        .mockImplementationOnce(async () => {
          return [mockCustomer[1]];
        });

      const response =
        await controller.findFilteredQueueCustomers('accommodated');
      expect(service.findFilteredQueueCustomers).toHaveBeenCalledWith(
        'accommodated',
      );
      expect(response).toStrictEqual([mockCustomer[1]]);
    });
  });

  describe('updateQueueCustomerStatus', () => {
    it('should update the queue status of a customer', async () => {
      jest
        .spyOn(service, 'updateQueueCustomer')
        .mockResolvedValueOnce(mockCustomer[1]);

      const mockCustomerA = mockCustomer[1];
      mockCustomerA.terminal = 'A';
      const response = await controller.updateQueueCustomer({
        queueId: 2,
        queueStatus: 'accommodated',
        terminal: 'A',
      });
      expect(response).toStrictEqual(mockCustomerA);
    });
  });
});
