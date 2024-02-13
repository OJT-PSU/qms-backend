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
    this.gateway.sendUpdateEvent();
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
    const updateResult = await this.prisma.queue.update({
      where: {
        queueId: queueId,
      },
      data: {
        queueStatus,
        terminal,
      },
    });

    this.gateway.sendUpdateEvent();
    return updateResult;
  }

  async remove(id: number) {
    const response = await this.prisma.queue.delete({
      where: {
        queueId: id,
      },
    });

    this.gateway.sendUpdateEvent();
    return response;
  }
}
