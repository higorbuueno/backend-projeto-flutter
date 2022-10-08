import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  users: CreateUserDto[];

  create(createUserDto: CreateUserDto) {
    if (this.users) {
      const newId = this.users[this.users.length - 1].id + 1;
      createUserDto.id = newId;
      this.users.push(createUserDto);
    } else {
      createUserDto.id = 1;
      this.users = [createUserDto];
    }
    return createUserDto;
  }

  findAll() {
    return this.users ? this.users : [];
  }

  findOne(id: number): CreateUserDto {
    const userResult = this.users.filter((user) => user.id == id);
    if (userResult[0]) {
      return userResult[0];
    }
    throw new HttpException(
      'Nenhum usuário cadastrado com este id',
      HttpStatus.BAD_REQUEST,
    );
  }

  update(id: number, createUserDto: CreateUserDto) {
    const index = this.users.findIndex((user) => user.id == id);
    if (index >= 0) {
      this.users[index] = createUserDto;
      return this.users[index];
    }
    throw new HttpException(
      'Nenhum usuário cadastrado com este id',
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id == id);
    if (index >= 0) {
      this.users.splice(index, 1);
    } else {
      throw new HttpException(
        'Nenhum usuário cadastrado com este id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
