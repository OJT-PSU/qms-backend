import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { DeleteTerminalsDto } from './dto/delete-terminal.dto';

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

  async findOneTerminal(id: number) {
    return await this.prisma.terminal.findFirst({
      where: {
        terminalId: id,
      },
    });
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

  async removeTerminal(params: DeleteTerminalsDto) {
    const { ids } = params;
    return this.prisma.terminal.deleteMany({
      where: {
        terminalId: {
          in: ids,
        },
      },
    });
  }
}
