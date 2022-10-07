import { Module } from '@nestjs/common';
import { FrasesService } from './frases.service';
import { FrasesController } from './frases.controller';

@Module({
  controllers: [FrasesController],
  providers: [FrasesService]
})
export class FrasesModule {}
