import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFraseDto } from './dto/create-frase.dto';
import { DataBaseFraseDto } from './dto/database-frase.dto';

@Injectable()
export class FrasesService {
  databaseFrases: DataBaseFraseDto[] = [
    {
      idUser: 1,
      listaFrases: [
        'Gostei desta frase!',
        'Desta também!',
        'O Higor vai ficar muito rico!',
      ],
    },
    {
      idUser: 2,
      listaFrases: ['O Higor vai ficar muito rico!', 'Com certeza!'],
    },
  ];

  create(createFraseDto: CreateFraseDto) {
    const index = this.databaseFrases.findIndex(
      (frasesDoUsuario) => frasesDoUsuario.idUser == createFraseDto.idUser,
    );
    if (index >= 0) {
      this.databaseFrases[index].listaFrases.push(createFraseDto.frase);
      return this.databaseFrases[index];
    }
    throw new HttpException('Usuário não encontrado.', HttpStatus.BAD_REQUEST);
  }

  findAll() {
    return this.databaseFrases;
  }

  findByUsuario(idUsuario: number) {
    var result = this.databaseFrases.filter(
      (frasesDoUsuario) => frasesDoUsuario.idUser == idUsuario,
    )[0];

    if (result) {
      return result;
    } else {
      throw new HttpException(
        'Usuário não encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(idUsuario: number, updateFraseDto: DataBaseFraseDto) {
    const index = this.databaseFrases.findIndex(
      (frasesDoUsuario) => frasesDoUsuario.idUser == idUsuario,
    );
    if (index >= 0) {
      return (this.databaseFrases[index] = updateFraseDto);
    }
    throw new HttpException('Usuário não encontrado.', HttpStatus.BAD_REQUEST);
  }

  remove(idUsuario: number, frase?: string) {
    const index = this.databaseFrases.findIndex(
      (frasesDoUsuario) => frasesDoUsuario.idUser == idUsuario,
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
}
