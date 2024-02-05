import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Queue, Prisma, QueueStatus, TerminalType } from '@prisma/client';

@Injectable()
export class QueueService {
  constructor(private prisma: PrismaService) {}

  async createQueueCustomer(data: Prisma.QueueCreateInput): Promise<Queue> {
    return await this.prisma.queue.create({
      data,
    });
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
    terminal: TerminalType,
  ) {
    return await this.prisma.queue.update({
      where: {
        queueId: queueId,
      },
      data: {
        queueStatus,
        terminal,
      },
    });
  }

  async remove(id: number) {
    const response = await this.prisma.queue.delete({
      where: {
        queueId: id,
      },
    });
    return response;
  }
}
