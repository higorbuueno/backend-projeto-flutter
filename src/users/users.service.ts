import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FrasesService } from 'src/frases/frases.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private frasesService: FrasesService,
  ) {}
  users: CreateUserDto[];

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersRepository.save(createUserDto);
    } catch (error) {
      throw new HttpException('Erro ao criar usuário', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar usuários',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.usersRepository.findOneBy({ username: username });
    } catch (error) {
      throw new HttpException('Erro ao buscar usuário', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.update({ id: id }, createUserDto);
      return createUserDto;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.delete({ id: id });
    } catch (error) {
      throw new HttpException(
        'Erro ao deletar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository
      .createQueryBuilder()
      .select()
      .where({ username: loginDto.username })
      .andWhere({ senha: loginDto.senha })
      .getOne();

    if (user) {
      return user;
    } else {
      throw new HttpException(
        'Usuário e senha incorretos',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
