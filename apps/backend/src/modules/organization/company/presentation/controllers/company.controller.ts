import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { PageResult } from '../../../../../core/application/pagination/page-result';
import { PaginationQueryDto } from '../../../../../core/presentation/dto/pagination-query.dto';

import { CreateCompanyCommand } from '../../application/create-company/create-company.command';
import { CreateCompanyResult } from '../../application/create-company/create-company.result';
import { CreateCompanyUseCase } from '../../application/create-company/create-company.use-case';

import { GetCompanyQuery } from '../../application/queries/get-company/get-company.query';
import { GetCompanyResult } from '../../application/queries/get-company/get-company.result';
import { GetCompanyUseCase } from '../../application/queries/get-company/get-company.use-case';

import { ListCompaniesQuery } from '../../application/queries/list-companies/list-companies.query';
import { CompanySummaryResult } from '../../application/queries/list-companies/list-companies.result';
import { ListCompaniesUseCase } from '../../application/queries/list-companies/list-companies.use-case';

import { UpdateCompanyDto } from '../dto/update-company.dto';

import { UpdateCompanyUseCase } from '../../application/update-company/update-company.use-case';
import { UpdateCompanyCommand } from '../../application/update-company/update-company.command';
import { UpdateCompanyResult } from '../../application/update-company/update-company.result';

import { DeleteCompanyUseCase } from '../../application/delete-company/delete-company.use-case';
import { DeleteCompanyCommand } from '../../application/delete-company/delete-company.command';
import { DeleteCompanyResult } from '../../application/delete-company/delete-company.result';

import { CreateCompanyDto } from '../dto/create-company.dto';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase,
    private readonly listCompaniesUseCase: ListCompaniesUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create company',
    description: 'Creates a new company in the system.',
  })
  @ApiCreatedResponse({
    description: 'Company created successfully.',
    type: CreateCompanyResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'A company with the same taxId already exists.',
  })
  async create(
    @Body() dto: CreateCompanyDto,
  ): Promise<CreateCompanyResult> {
    return this.createCompanyUseCase.execute(
      new CreateCompanyCommand(
        dto.name,
        dto.legalName ?? null,
        dto.taxId ?? null,
        dto.email ?? null,
        dto.phone ?? null,
        dto.currencyCode ?? 'COP',
        dto.timezone ?? 'America/Bogota',
      ),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get company by id',
    description: 'Returns a company by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Company identifier',
    example: 'cms4wwj3q0000w2ugzkvm1upu',
  })
  @ApiOkResponse({
    description: 'Company found.',
    type: GetCompanyResult,
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<GetCompanyResult> {
    return this.getCompanyUseCase.execute(
      new GetCompanyQuery(id),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'List companies',
    description: 'Returns a paginated list of companies.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    example: 10,
  })
  @ApiOkResponse({
    description: 'Paginated list of companies.',
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PageResult<CompanySummaryResult>> {
    return this.listCompaniesUseCase.execute(
      new ListCompaniesQuery(
        query.page,
        query.pageSize,
      ),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update company',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ): Promise<UpdateCompanyResult> {

    return this.updateCompanyUseCase.execute(
      new UpdateCompanyCommand(
        id,
        dto.name!,
        dto.legalName ?? null,
        dto.taxId ?? null,
        dto.email ?? null,
        dto.phone ?? null,
        dto.currencyCode ?? 'COP',
        dto.timezone ?? 'America/Bogota',
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete company',
  })
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteCompanyResult> {

    return this.deleteCompanyUseCase.execute(
      new DeleteCompanyCommand(id),
    );
  }
}