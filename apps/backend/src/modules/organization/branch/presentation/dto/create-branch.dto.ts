import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({
    description: 'Company identifier.',
    example: 'cmel3n3kb0000abc123xyz',
  })
  @IsString()
  @IsNotEmpty()
  readonly companyId: string;

  @ApiProperty({
    description: 'Unique branch code within the company.',
    example: 'CTG',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly code: string;

  @ApiProperty({
    description: 'Branch name.',
    example: 'Cartagena Centro',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Branch email.',
    example: 'cartagena@beercontrol.com',
  })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'Branch phone.',
    example: '+573001112233',
  })
  @IsOptional()
  @Matches(/^[+\d\s()-]+$/)
  readonly phone?: string;

  @ApiPropertyOptional({
    description: 'Branch address.',
    example: 'Cra 10 #20-30',
  })
  @IsOptional()
  @MaxLength(250)
  readonly address?: string;

  @ApiProperty({
    description: 'City.',
    example: 'Cartagena',
  })
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @ApiPropertyOptional({
    description: 'State / Department.',
    example: 'Bolívar',
  })
  @IsOptional()
  readonly state?: string;

  @ApiProperty({
    description: 'Country.',
    example: 'Colombia',
  })
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @ApiPropertyOptional({
    description: 'Postal code.',
    example: '130001',
  })
  @IsOptional()
  readonly postalCode?: string;

  @ApiPropertyOptional({
    description: 'IANA timezone.',
    example: 'America/Bogota',
    default: 'America/Bogota',
  })
  @IsOptional()
  readonly timezone?: string = 'America/Bogota';
}