import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { FrasesModule } from 'src/frases/frases.module';

@Module({
  imports: [FrasesModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthModule]
})
export class AuthModule {}
