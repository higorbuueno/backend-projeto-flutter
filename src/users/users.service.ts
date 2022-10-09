import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FrasesService } from 'src/frases/frases.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private frasesService: FrasesService) {}
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
    this.verificarSeExisteUsuarios();

    return this.users;
  }

  findOne(id: number): CreateUserDto {
    this.verificarSeExisteUsuarios();

    const userResult = this.users.filter((user) => user.id == id);
    if (userResult[0]) {
      return userResult[0];
    }
    throw new HttpException(
      'Nenhum usuário cadastrado com este id',
      HttpStatus.BAD_REQUEST,
    );
  }

  findByUsername(username: String): CreateUserDto {
    this.verificarSeExisteUsuarios();

    const userResult = this.users.filter((user) => user.nome == username);
    if (userResult[0]) {
      return userResult[0];
    }
    throw new HttpException(
      'Nenhum usuário cadastrado com este id',
      HttpStatus.BAD_REQUEST,
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.verificarSeExisteUsuarios();

    const index = this.users.findIndex((user) => user.id == id);
    if (index > 0) {
      this.users[index].nome = updateUserDto.nome;
      return this.users[index];
    }
    throw new HttpException(
      'Nenhum usuário cadastrado com este id',
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: number) {
    this.verificarSeExisteUsuarios();

    const index = this.users.findIndex((user) => user.id == id);
    if (index > 0) {
      this.users.splice(index, 1);
      this.frasesService.deleteAllByUserId(id);
    } else {
      throw new HttpException(
        'Nenhum usuário cadastrado com este id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  verificarSeExisteUsuarios() {
    if (!this.users) {
      throw new HttpException(
        'Não há usuários cadastrados',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
