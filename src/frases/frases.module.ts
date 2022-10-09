import { Module } from '@nestjs/common';
import { FrasesService } from './frases.service';
import { FrasesController } from './frases.controller';
import { Frase } from './entities/frase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Frase])],
  controllers: [FrasesController],
  providers: [FrasesService],
  exports: [FrasesService, TypeOrmModule]
})
export class FrasesModule {}
