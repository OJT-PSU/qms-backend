import { IsEmail, IsNotEmpty, IsPhoneNumber, IsIn } from 'class-validator';
import { transactionType } from '@prisma/client';

export class CreateQueueDto {
  @IsNotEmpty({
    message: 'name should not be empty',
  })
  name: string;

  @IsEmail()
  email?: string;

  @IsPhoneNumber('PH')
  contactNumber?: string;

  @IsIn(['payment', 'checkReleasing', 'inquiry'])
  transactionType: transactionType;
}
