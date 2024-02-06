import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';

@Controller('terminal')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Post()
  create(@Body() createTerminalDto: CreateTerminalDto) {
    return this.terminalService.createTerminal(createTerminalDto);
  }

  @Get()
  findAll() {
    return this.terminalService.findAllTerminals();
  }

  @Patch(':id')
  update(
    @Param('id') terminalId: string,
    @Body() updateTerminalDto: UpdateTerminalDto,
  ) {
    return this.terminalService.updateTerminal(+terminalId, updateTerminalDto);
  }

  @Delete(':id')
  remove(@Param('id') terminalId: string) {
    return this.terminalService.removeTerminal(+terminalId);
  }
}
