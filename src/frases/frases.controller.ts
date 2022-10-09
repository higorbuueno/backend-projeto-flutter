import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FrasesService } from './frases.service';
import { CreateFraseDto } from './dto/create-frase.dto';
import { FrasesByUserDto } from './dto/database-frase.dto';

@Controller('frases')
export class FrasesController {
  constructor(private readonly frasesService: FrasesService) {}

  @Post()
  create(@Body() createFraseDto: CreateFraseDto) {
    return this.frasesService.create(createFraseDto);
  }

  @Get()
  findAll() {
    return this.frasesService.findAll();
  }

  @Get('usuario/:id')
  findByUsuario(@Param('id') id: string) {
    return this.frasesService.findByIdUsuario(+id);
  }

  @Patch('usuario/:id')
  update(@Param('id') id: string, @Body() dataBaseFraseDto: FrasesByUserDto) {
    return this.frasesService.update(+id, dataBaseFraseDto);
  }

  @Delete('usuario/:id')
  remove(@Param('id') id: string, @Body() createFraseDto: CreateFraseDto) {
    return this.frasesService.remove(+id, createFraseDto.frase);
  }
}
