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

import { PageResult } from '../../../../../core/application/pagination/page-result';
import { PaginationQueryDto } from '../../../../../core/presentation/dto/pagination-query.dto';

import { CreateUnitCommand } from '../../application/create-unit/create-unit.command';
import { CreateUnitResult } from '../../application/create-unit/create-unit.result';
import { CreateUnitUseCase } from '../../application/create-unit/create-unit.use-case';

import { GetUnitQuery } from '../../application/queries/get-unit/get-unit.query';
import { GetUnitResult } from '../../application/queries/get-unit/get-unit.result';
import { GetUnitUseCase } from '../../application/queries/get-unit/get-unit.use-case';

import { ListUnitsQuery } from '../../application/queries/list-units/list-units.query';
import { UnitSummaryResult } from '../../application/queries/list-units/unit-summary.result';
import { ListUnitsUseCase } from '../../application/queries/list-units/list-units.use-case';

import { UpdateUnitCommand } from '../../application/update-unit/update-unit.command';
import { UpdateUnitResult } from '../../application/update-unit/update-unit.result';
import { UpdateUnitUseCase } from '../../application/update-unit/update-unit.use-case';

import { DeleteUnitCommand } from '../../application/delete-unit/delete-unit.command';
import { DeleteUnitResult } from '../../application/delete-unit/delete-unit.result';
import { DeleteUnitUseCase } from '../../application/delete-unit/delete-unit.use-case';

import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';

@ApiTags('Units')
@Controller('units')
export class UnitController {
  constructor(
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly getUnitUseCase: GetUnitUseCase,
    private readonly listUnitsUseCase: ListUnitsUseCase,
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
    description:
      'A unit with the same code already exists for this company.',
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  async create(
    @Body() dto: CreateUnitDto,
  ): Promise<CreateUnitResult> {

    return this.createUnitUseCase.execute(
      new CreateUnitCommand(
        dto.companyId,
        dto.code,
        dto.name,
        dto.symbol,
        dto.description ?? null,
      ),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get unit by id',
    description: 'Returns a unit by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unit identifier.',
  })
  @ApiOkResponse({
    description: 'Unit found.',
    type: GetUnitResult,
  })
  @ApiNotFoundResponse({
    description: 'Unit not found.',
  })
  async findById(
    @Param('id') id: string,
  ): Promise<GetUnitResult> {

    return this.getUnitUseCase.execute(
      new GetUnitQuery(id),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'List units',
    description:
      'Returns a paginated list of measurement units.',
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
    description: 'Paginated list of units.',
  })
  async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<PageResult<UnitSummaryResult>> {

    return this.listUnitsUseCase.execute(
      new ListUnitsQuery(
        query.page,
        query.pageSize,
      ),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update unit',
    description:
      'Updates an existing measurement unit.',
  })
  @ApiOkResponse({
    description: 'Unit updated successfully.',
    type: UpdateUnitResult,
  })
  @ApiNotFoundResponse({
    description: 'Unit not found.',
  })
  @ApiConflictResponse({
    description:
      'A unit with the same code already exists for this company.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUnitDto,
  ): Promise<UpdateUnitResult> {

    return this.updateUnitUseCase.execute(
      new UpdateUnitCommand(
        id,
        dto.code!,
        dto.name!,
        dto.symbol!,
        dto.description ?? null,
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete unit',
    description:
      'Soft deletes an existing measurement unit.',
  })
  @ApiOkResponse({
    description: 'Unit deleted successfully.',
    type: DeleteUnitResult,
  })
  @ApiNotFoundResponse({
    description: 'Unit not found.',
  })
  async delete(
    @Param('id') id: string,
  ): Promise<DeleteUnitResult> {

    return this.deleteUnitUseCase.execute(
      new DeleteUnitCommand(id),
    );
  }
}