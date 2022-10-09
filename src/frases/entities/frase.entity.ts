import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Frase {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_usuario: number;
  
    @Column()
    frase: string;
}
