import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Queue, Prisma, QueueStatus } from '@prisma/client';

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

  async updateQueueCustomerStatus(
    queueId: number,
    params: Prisma.QueueUpdateInput,
  ) {
    return await this.prisma.queue.update({
      where: {
        queueId: queueId,
      },
      data: {
        queueStatus: params.queueStatus,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} queue`;
  }
}
