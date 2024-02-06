import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Display, Prisma } from '@prisma/client';
@Injectable()
export class DisplayService {
  constructor(private prisma: PrismaService) {}

  async createDisplay(data: Prisma.DisplayCreateInput): Promise<Display> {
    return await this.prisma.display.create({
      data,
    });
  }

  async getDisplay(): Promise<Array<Display>> {
    return this.prisma.display.findMany({});
  }

  async getOneDisplay(id: number): Promise<Array<Display>> {
    const response = await this.prisma.display.findMany({
      where: {
        displayId: id,
      },
    });
    return response;
  }

  async remove(id: number) {
    const response = await this.prisma.display.delete({
      where: {
        displayId: id,
      },
    });
    return response;
  }

  async updateOne(displayId: number, dispMsg: string, scrollTime: string) {
    const response = await this.prisma.display.update({
      where: {
        displayId: displayId,
      },
      data: {
        dispMsg,
        scrollTime,
      },
    });
    return response;
  }
}