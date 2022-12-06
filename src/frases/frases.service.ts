import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFraseDto } from './dto/create-frase.dto';
import { FrasesByUserDto } from './dto/database-frase.dto';
import { UpdateFraseDto } from './dto/update-frase.dto';
import { Frase } from './entities/frase.entity';

@Injectable()
export class FrasesService {
  databaseFrases: FrasesByUserDto[] = [
    {
      idUsuario: 1,
      listaFrases: ['Gostei desta frase!'],
    },
    {
      idUsuario: 2,
      listaFrases: ['O Higor vai ficar muito rico!!', 'Com certeza!'],
    },
  ];

  constructor(
    @InjectRepository(Frase)
    private frasesRepository: Repository<Frase>,
  ) {}

  async create(createFraseDto: CreateFraseDto) {
    const fraseEntity: Frase = {
      id: null,
      id_usuario: createFraseDto.idUsuario,
      frase: createFraseDto.frase,
    };
    await this.frasesRepository.save(fraseEntity);
  }

  async findAll(): Promise<Frase[]> {
    try {
      return await this.frasesRepository.find();
    } catch (error) {
      throw new HttpException(
        'Falha ao buscar frases.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByIdUsuario(idUsuario: number) {
    try {
      const resultEntity = await this.frasesRepository.findBy({
        id_usuario: idUsuario,
      });

      var frasesDoUsuario: FrasesByUserDto = {
        idUsuario: idUsuario,
        listaFrases: [],
      };

      resultEntity.forEach((element) => {
        frasesDoUsuario.listaFrases.push(element.frase);
      });

      return frasesDoUsuario;
    } catch (error) {
      throw new HttpException(
        'Falha ao buscar frases deste usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(idUsuario: number, updateFraseDto: FrasesByUserDto) {
    const index = this.databaseFrases.findIndex(
      (frasesDoUsuario) => frasesDoUsuario.idUsuario == idUsuario,
    );
    if (index >= 0) {
      return (this.databaseFrases[index] = updateFraseDto);
    }
    throw new HttpException('Usuário não encontrado.', HttpStatus.BAD_REQUEST);
  }

  async updateById(id: number, frase: UpdateFraseDto) {
    const fraseToSave: Frase = {
      id: id,
      frase: frase.frase,
      id_usuario: frase.idUsuario,
    };
    try {
      await this.frasesRepository.save(fraseToSave);
    } catch (error) {
      throw new HttpException('Erro ao apagar frase.', HttpStatus.BAD_REQUEST);
    }
  }

  remove(idUsuario: number, frase?: string) {
    const index = this.databaseFrases.findIndex(
      (frasesDoUsuario) => frasesDoUsuario.idUsuario == idUsuario,
    );

    if (index >= 0) {
      if (frase) {
        const indexFrase = this.databaseFrases[index].listaFrases.findIndex(
          (frasesDoUsuario) => frasesDoUsuario == frase,
        );
        if (indexFrase >= 0) {
          this.databaseFrases[index].listaFrases.splice(indexFrase, 1);
        } else {
          throw new HttpException(
            'Frase não encontrada.',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        this.databaseFrases[index].listaFrases = [];
      }
      return this.databaseFrases[index];
    }
    throw new HttpException('Usuário não encontrado.', HttpStatus.BAD_REQUEST);
  }

  async deleteById(id: number) {
    try {
      await this.frasesRepository.delete({ id: id });
    } catch (error) {
      throw new HttpException('Erro ao apagar frase.', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteAllByUserId(idUsuario: number) {
    try {
      // Precisa testar!
      await this.frasesRepository.delete({ id_usuario: idUsuario });
    } catch (error) {
      throw new HttpException(
        'Erro ao apagar frases do usuário.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
