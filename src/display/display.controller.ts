import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { DisplayService } from './display.service';
import { CreateDisplayDto } from './dto/create-display.dto';
import { UpdateDisplayDto, UpdateThemeDto } from './dto/update-display.dto';
@Controller('display')
export class DisplayController {
  constructor(private readonly displayService: DisplayService) {}

  @Post()
  @HttpCode(201)
  createDisplay(@Body() createDisplayDto: CreateDisplayDto) {
    return this.displayService.createDisplay(createDisplayDto);
  }
  @Get('/theme')
  getTheme() {
    return this.displayService.getTheme();
  }

  @Get()
  @HttpCode(200)
  getDisplay() {
    return this.displayService.getDisplay();
  }

  @Get(':id')
  @HttpCode(201)
  getOneDisplay(@Param('id') id: string) {
    return this.displayService.getOneDisplay(+id);
  }

  @Patch('theme')
  updateTheme(@Body() body: UpdateThemeDto) {
    const { displayId, themeType } = body;
    return this.displayService.updateTheme(displayId, themeType);
  }

  @Patch()
  @HttpCode(200)
  updateOne(@Body() body: UpdateDisplayDto) {
    return this.displayService.updateOne(
      body.displayId,
      body.dispMsg,
      body.scrollTime,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.displayService.remove(+id);
  }
}
