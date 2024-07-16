import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ActiveEnum, OrderEnum } from './common.constant';

export class GetCodeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(12)
  code: string;
}

export class UsernameDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Transform(({ value }) => value.toLowerCase().trim())
  username: string;
}

export class CommonPaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsEnum(ActiveEnum)
  active: string;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @IsOptional()
  @IsString()
  scope: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @Min(1)
  limit: string;
}

export class UpdateDeviceSessionsDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  web: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  app: number;
}
