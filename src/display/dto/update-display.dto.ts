import { PartialType } from '@nestjs/mapped-types';
import { CreateDisplayDto } from './create-display.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDisplayDto extends PartialType(CreateDisplayDto) {
  @IsNumber()
  displayId: number;

  @IsNumber()
  @IsOptional()
  themeType?: number;
}

export class UpdateThemeDto {
  @IsNumber()
  displayId: number;

  @IsNumber()
  themeType?: number;
}

export class UpdateThemeMessageDto {
  @IsNumber()
  displayId: number;

  @IsString()
  dispMsg: string;
}
