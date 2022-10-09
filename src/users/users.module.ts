import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FrasesService } from 'src/frases/frases.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FrasesService],
  exports: [UsersService]
})
export class UsersModule {}
