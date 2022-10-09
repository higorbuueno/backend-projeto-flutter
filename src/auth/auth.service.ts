import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}
  login(createUserDto: CreateUserDto) {
   const userResponse = this.usersService.findByUsername(createUserDto.nome);
   console.log(userResponse);
  }
}
