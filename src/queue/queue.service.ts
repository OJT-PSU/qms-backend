import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Queue, Prisma, QueueStatus } from '@prisma/client';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class QueueService {
  constructor(
    @Inject(forwardRef(() => EventsGateway)) private gateway: EventsGateway,
    private prisma: PrismaService,
  ) {}

  async createQueueCustomer(data: Prisma.QueueCreateInput): Promise<Queue> {
    const createdCustomer = await this.prisma.queue.create({
      data,
    });
    const customers = await this.findAllQueueCustomers();
    this.gateway.sendUpdateEvent(customers);
    return createdCustomer;
  }

  async findAllQueueCustomers(): Promise<Array<Queue>> {
    return this.prisma.queue.findMany({});
  }

  async findFilteredQueueCustomers(
    queueStatus: QueueStatus,
  ): Promise<Array<Queue>> {
    return await this.prisma.queue.findMany({
      where: {
        queueStatus,
      },
    });
  }

  findOneQueueCustomer(id: number) {
    return `This action returns a #${id} queue`;
  }

  async updateQueueCustomer(
    queueId: number,
    queueStatus: QueueStatus,
    terminal: string,
  ) {
    let toDisplay: number = 0;
    if (queueStatus === 'accommodated') {
      toDisplay = 1;
    }

    const updateResult = await this.prisma.queue.update({
      where: {
        queueId: queueId,
      },
      data: {
        queueStatus,
        terminal,
        toDisplay,
      },
    });
    const customers = await this.findAllQueueCustomers();
    this.gateway.sendUpdateEvent(customers);
    return updateResult;
  }

  async updateAllToDisplay() {
    const updateResult = await this.prisma.queue.updateMany({
      where: {},
      data: {
        toDisplay: 1,
      },
    });

    const customers = await this.findAllQueueCustomers();
    this.gateway.sendUpdateEvent(customers);
    return updateResult;
  }

  async remove(id: number) {
    const response = await this.prisma.queue.delete({
      where: {
        queueId: id,
      },
    });

    const customers = await this.findAllQueueCustomers();
    this.gateway.sendUpdateEvent(customers);
    return response;
  }
}
