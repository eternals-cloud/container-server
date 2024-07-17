import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateNetworkDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  driver: string;
}

export class UpdateNetworkDto extends PartialType(CreateNetworkDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}
