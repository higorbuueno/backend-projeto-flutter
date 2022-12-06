export class FrasesByUserDto {
    idUsuario: number;
    listaFrases: Frase[];
}

class Frase {
    idFrase: number;
    frase: string;
}
