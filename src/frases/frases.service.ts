import { Injectable } from '@nestjs/common';
import { CreateFraseDto } from './dto/create-frase.dto';
import { DataBaseFraseDto } from './dto/database-frase.dto';
import { UpdateFraseDto } from './dto/update-frase.dto';

@Injectable()
export class FrasesService {
  databaseFrases: DataBaseFraseDto[] = [];

  create(createFraseDto: CreateFraseDto) {
    const index = this.databaseFrases.findIndex((frasesDoUsuario) => frasesDoUsuario.idUser == createFraseDto.idUser);
    this.databaseFrases[index].listaFrases.push(createFraseDto.frase);
    
    return this.databaseFrases[index];
  }

  findAll() {
    this.databaseFrases.push({idUser: 1, listaFrases:["Gostei desta frase!", "Desta também!", "O Higor vai ficar muito rico!"]});
    this.databaseFrases.push({idUser: 2, listaFrases:["O Higor vai ficar muito rico!", "Com certeza!"]});

    return this.databaseFrases;
  }

  findOne(id: number) {
    return `This action returns a #${id} frase`;
  }

  update(id: number, updateFraseDto: UpdateFraseDto) {
    return `This action updates a #${id} frase`;
  }

  remove(id: number) {
    return `This action removes a #${id} frase`;
  }

  deleteAllByUserId(id: number) {
    return `This action removes a #${id} frase`;
  }
}
