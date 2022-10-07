import { PartialType } from '@nestjs/mapped-types';
import { CreateFraseDto } from './create-frase.dto';

export class UpdateFraseDto extends PartialType(CreateFraseDto) {}
