import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TerminalService {
  constructor(private prisma: PrismaService) {}

  async createTerminal(data: Prisma.TerminalCreateInput) {
    return await this.prisma.terminal.create({
      data,
    });
  }

  async findAllTerminals() {
    return await this.prisma.terminal.findMany({});
  }

  async updateTerminal(
    terminalId: number,
    updateDto: Prisma.TerminalUpdateInput,
  ) {
    const { terminalName, status, remarks } = updateDto;
    return this.prisma.terminal.update({
      where: {
        terminalId: terminalId,
      },
      data: {
        terminalName,
        status,
        remarks,
      },
    });
  }

  async removeTerminal(terminalId: number) {
    return this.prisma.terminal.delete({
      where: {
        terminalId,
      },
    });
  }
}
