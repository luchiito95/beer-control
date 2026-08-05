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

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Commercial name of the company.',
    example: 'Beer Control SAS',
    maxLength: 150,
  })
  @IsString({
    message: 'The company name must be a string.',
  })
  @IsNotEmpty({
    message: 'The company name is required.',
  })
  @Length(3, 150, {
    message: 'The company name must contain between 3 and 150 characters.',
  })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Legal registered name.',
    example: 'Beer Control S.A.S.',
    maxLength: 200,
  })
  @IsOptional()
  @IsString({
    message: 'The legal name must be a string.',
  })
  @MaxLength(200, {
    message: 'The legal name cannot exceed 200 characters.',
  })
  readonly legalName?: string;

  @ApiPropertyOptional({
    description: 'Company tax identification number.',
    example: '901234567',
    maxLength: 30,
  })
  @IsOptional()
  @Matches(/^[0-9-]+$/, {
    message: 'The tax ID may only contain numbers and hyphens.',
  })
  @MaxLength(30, {
    message: 'The tax ID cannot exceed 30 characters.',
  })
  readonly taxId?: string;

  @ApiPropertyOptional({
    description: 'Primary company email.',
    example: 'contact@beercontrol.com',
    maxLength: 150,
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'The email address is not valid.',
    },
  )
  @MaxLength(150, {
    message: 'The email cannot exceed 150 characters.',
  })
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'Primary company phone number.',
    example: '+573001234567',
    maxLength: 25,
  })
  @IsOptional()
  @Matches(/^[+\d\s()-]+$/, {
    message: 'The phone number format is invalid.',
  })
  @MaxLength(25, {
    message: 'The phone number cannot exceed 25 characters.',
  })
  readonly phone?: string;

  @ApiPropertyOptional({
    description: 'ISO 4217 currency code.',
    example: 'COP',
    default: 'COP',
  })
  @IsOptional()
  @Matches(/^[A-Z]{3}$/, {
    message: 'Currency code must be a valid ISO 4217 code.',
  })
  readonly currencyCode?: string = 'COP';

  @ApiPropertyOptional({
    description: 'IANA timezone identifier.',
    example: 'America/Bogota',
    default: 'America/Bogota',
  })
  @IsOptional()
  @Matches(/^[A-Za-z_]+\/[A-Za-z_]+$/, {
    message: 'Timezone must be a valid IANA timezone.',
  })
  readonly timezone?: string = 'America/Bogota';
}
