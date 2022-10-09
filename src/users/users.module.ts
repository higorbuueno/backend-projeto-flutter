import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FrasesService } from 'src/frases/frases.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrasesModule } from 'src/frases/frases.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FrasesModule],
  controllers: [UsersController],
  providers: [UsersService, FrasesService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
