import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { DeleteTerminalsDto } from './dto/delete-terminal.dto';

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

  @Get(':id')
  findOneTerminal(@Param('id', ParseIntPipe) id: number) {
    return this.terminalService.findOneTerminal(id);
  }

  @Patch(':id')
  update(
    @Param('id') terminalId: string,
    @Body() updateTerminalDto: UpdateTerminalDto,
  ) {
    return this.terminalService.updateTerminal(+terminalId, updateTerminalDto);
  }

  @Delete()
  remove(@Body() deleteTerminalsDto: DeleteTerminalsDto) {
    return this.terminalService.removeTerminal(deleteTerminalsDto);
  }
}
