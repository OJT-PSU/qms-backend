import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsIn,
  IsOptional,
} from 'class-validator';
import { transactionType } from '@prisma/client';

export class CreateQueueDto {
  @IsNotEmpty({
    message: 'name should not be empty',
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    },
  )
  email?: string;

  @IsOptional()
  @IsPhoneNumber('PH', {
    message: 'Number must be a valid email address',
  })
  contactNumber?: string;

  @IsOptional()
  @IsIn(['payment', 'checkReleasing', 'inquiry'])
  transactionType: transactionType;
}
