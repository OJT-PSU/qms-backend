import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateQueueDto {
  @IsNotEmpty({
    message: 'name should not be empty',
  })
  name: string;

  @IsEmail()
  email?: string;

  @IsPhoneNumber('PH')
  contactNumber?: string;
}
