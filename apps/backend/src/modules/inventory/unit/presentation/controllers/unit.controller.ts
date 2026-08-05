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
  ApiTags,
} from '@nestjs/swagger';

import { SearchPage } from '../../../../../core/application/search/search-page';

import { CreateUnitUseCase } from '../../application/create-unit/create-unit.use-case';
import { CreateUnitResult } from '../../application/create-unit/create-unit.result';

import { UpdateUnitUseCase } from '../../application/update-unit/update-unit.use-case';
import { UpdateUnitResult } from '../../application/update-unit/update-unit.result';

import { DeleteUnitUseCase } from '../../application/delete-unit/delete-unit.use-case';
import { DeleteUnitResult } from '../../application/delete-unit/delete-unit.result';

import { GetUnitUseCase } from '../../application/queries/get-unit/get-unit.use-case';
import { GetUnitResult } from '../../application/queries/get-unit/get-unit.result';

import { SearchUnitsUseCase } from '../../application/queries/search-units/search-units.use-case';
import { UnitSummaryResult } from '../../application/queries/search-units/unit-summary.result';

import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { SearchUnitDto } from '../dto/search-unit.dto';

import { UnitCommandMapper } from '../mappers/unit-command.mapper';
import { UnitQueryMapper } from '../mappers/unit-query.mapper';
import { UnitSearchMapper } from '../mappers/unit-search.mapper';

@ApiTags('Units')
@Controller('units')
export class UnitController {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly getUnitUseCase: GetUnitUseCase,
    private readonly searchUnitsUseCase: SearchUnitsUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
    private readonly deleteUnitUseCase: DeleteUnitUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create unit',
    description: 'Creates a new measurement unit.',
  })
  @ApiCreatedResponse({
    description: 'Unit created successfully.',
    type: CreateUnitResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'A unit with the same code already exists.',
  })
  async create(@Body() dto: CreateUnitDto): Promise<CreateUnitResult> {
    return this.createUnitUseCase.execute(UnitCommandMapper.toCreate(dto));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get unit by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Unit identifier.',
  })
  @ApiOkResponse({
    type: GetUnitResult,
  })
  @ApiNotFoundResponse({
    description: 'Unit not found.',
  })
  async findById(@Param('id') id: string): Promise<GetUnitResult> {
    return this.getUnitUseCase.execute(UnitQueryMapper.toGet(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Search units',
    description: 'Returns a paginated list of measurement units.',
  })
  @ApiOkResponse({
    description: 'Paginated list of units.',
  })
  async search(
    @Query() dto: SearchUnitDto,
  ): Promise<SearchPage<UnitSummaryResult>> {
    return this.searchUnitsUseCase.execute(
      UnitQueryMapper.toSearch(UnitSearchMapper.toCriteria(dto)),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update unit',
  })
  @ApiOkResponse({
    type: UpdateUnitResult,
  })
  @ApiNotFoundResponse({
    description: 'Unit not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUnitDto,
  ): Promise<UpdateUnitResult> {
    return this.updateUnitUseCase.execute(UnitCommandMapper.toUpdate(id, dto));
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete unit',
  })
  @ApiOkResponse({
    type: DeleteUnitResult,
  })
  async delete(@Param('id') id: string): Promise<DeleteUnitResult> {
    return this.deleteUnitUseCase.execute(UnitQueryMapper.toDelete(id));
  }
}
