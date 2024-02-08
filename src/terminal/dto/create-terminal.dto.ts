import { TerminalStatus, transactionType } from '@prisma/client';
import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateTerminalDto {
  @IsNotEmpty({
    message: 'Terminal name should not be empty.',
  })
  terminalName: string;

  @IsIn(['active', 'inactive'])
  status: TerminalStatus;

  remarks: string;
  @IsIn(['payment', 'checkReleasing', 'inquiry'])
  transactionType: transactionType;
}
