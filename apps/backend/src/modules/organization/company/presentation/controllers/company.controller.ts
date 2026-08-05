import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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

import { SearchPage } from '../../../../../core/application/search/search-page';

import { CreateCompanyUseCase } from '../../application/create-company/create-company.use-case';
import { CreateCompanyResult } from '../../application/create-company/create-company.result';

import { UpdateCompanyUseCase } from '../../application/update-company/update-company.use-case';
import { UpdateCompanyResult } from '../../application/update-company/update-company.result';

import { DeleteCompanyUseCase } from '../../application/delete-company/delete-company.use-case';
import { DeleteCompanyResult } from '../../application/delete-company/delete-company.result';

import { GetCompanyUseCase } from '../../application/queries/get-company/get-company.use-case';
import { GetCompanyResult } from '../../application/queries/get-company/get-company.result';

import { SearchCompaniesUseCase } from '../../application/queries/search-companies/search-companies.use-case';
import { CompanySummaryResult } from '../../application/queries/search-companies/company-summary.result';

import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { SearchCompanyDto } from '../dto/search-company.dto';

import { CompanyCommandMapper } from '../mappers/company-command.mapper';
import { CompanyQueryMapper } from '../mappers/company-query.mapper';
import { CompanySearchMapper } from '../mappers/company-search.mapper';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase,
    private readonly searchCompaniesUseCase: SearchCompaniesUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create company',
    description: 'Creates a new company.',
  })
  @ApiCreatedResponse({
    description: 'Company created successfully.',
    type: CreateCompanyResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Company tax id already exists.',
  })
  async create(@Body() dto: CreateCompanyDto): Promise<CreateCompanyResult> {
    return this.createCompanyUseCase.execute(
      CompanyCommandMapper.toCreate(dto),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get company by id',
    description: 'Returns a company by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Company identifier.',
  })
  @ApiOkResponse({
    description: 'Company found.',
    type: GetCompanyResult,
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  async findById(@Param('id') id: string): Promise<GetCompanyResult> {
    return this.getCompanyUseCase.execute(CompanyQueryMapper.toGet(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Search companies',
    description: 'Returns a paginated list of companies using filters.',
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
  async search(
    @Query() dto: SearchCompanyDto,
  ): Promise<SearchPage<CompanySummaryResult>> {
    return this.searchCompaniesUseCase.execute(
      CompanyQueryMapper.toSearch(CompanySearchMapper.toCriteria(dto)),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update company',
    description: 'Updates an existing company.',
  })
  @ApiOkResponse({
    description: 'Company updated successfully.',
    type: UpdateCompanyResult,
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  @ApiConflictResponse({
    description: 'Company tax id already exists.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ): Promise<UpdateCompanyResult> {
    return this.updateCompanyUseCase.execute(
      CompanyCommandMapper.toUpdate(id, dto),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete company',
    description: 'Soft deletes a company.',
  })
  @ApiOkResponse({
    description: 'Company deleted successfully.',
    type: DeleteCompanyResult,
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  async delete(@Param('id') id: string): Promise<DeleteCompanyResult> {
    return this.deleteCompanyUseCase.execute(CompanyQueryMapper.toDelete(id));
  }
}
