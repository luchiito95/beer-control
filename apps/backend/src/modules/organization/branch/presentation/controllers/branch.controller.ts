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

import { CreateBranchUseCase } from '../../application/create-branch/create-branch.use-case';
import { CreateBranchResult } from '../../application/create-branch/create-branch.result';

import { UpdateBranchUseCase } from '../../application/update-branch/update-branch.use-case';
import { UpdateBranchResult } from '../../application/update-branch/update-branch.result';

import { DeleteBranchUseCase } from '../../application/delete-branch/delete-branch.use-case';
import { DeleteBranchResult } from '../../application/delete-branch/delete-branch.result';

import { GetBranchUseCase } from '../../application/queries/get-branch/get-branch.use-case';
import { GetBranchResult } from '../../application/queries/get-branch/get-branch.result';

import { SearchBranchesUseCase } from '../../application/queries/search-branches/search-branches.use-case';
import { BranchSummaryResult } from '../../application/queries/search-branches/branch-summary.result';

import { CreateBranchDto } from '../dto/create-branch.dto';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { SearchBranchDto } from '../dto/search-branch.dto';

import { BranchCommandMapper } from '../mappers/branch-command.mapper';
import { BranchQueryMapper } from '../mappers/branch-query.mapper';
import { BranchSearchMapper } from '../mappers/branch-search.mapper';

@ApiTags('Branches')
@Controller('branches')
export class BranchController {
  constructor(
    private readonly createBranchUseCase: CreateBranchUseCase,
    private readonly updateBranchUseCase: UpdateBranchUseCase,
    private readonly deleteBranchUseCase: DeleteBranchUseCase,
    private readonly getBranchUseCase: GetBranchUseCase,
    private readonly searchBranchesUseCase: SearchBranchesUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create branch',
    description: 'Creates a new branch.',
  })
  @ApiCreatedResponse({
    description: 'Branch created successfully.',
    type: CreateBranchResult,
  })
  @ApiBadRequestResponse({
    description: 'Validation error.',
  })
  @ApiConflictResponse({
    description: 'Branch code already exists.',
  })
  async create(@Body() dto: CreateBranchDto): Promise<CreateBranchResult> {
    return this.createBranchUseCase.execute(BranchCommandMapper.toCreate(dto));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get branch by id',
    description: 'Returns a branch by its identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Branch identifier.',
  })
  @ApiOkResponse({
    description: 'Branch found.',
    type: GetBranchResult,
  })
  @ApiNotFoundResponse({
    description: 'Branch not found.',
  })
  async findById(@Param('id') id: string): Promise<GetBranchResult> {
    return this.getBranchUseCase.execute(BranchQueryMapper.toGet(id));
  }

  @Get()
  @ApiOperation({
    summary: 'Search branches',
    description: 'Returns a paginated list of branches using filters.',
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
    @Query() dto: SearchBranchDto,
  ): Promise<SearchPage<BranchSummaryResult>> {
    return this.searchBranchesUseCase.execute(
      BranchQueryMapper.toSearch(BranchSearchMapper.toCriteria(dto)),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update branch',
    description: 'Updates an existing branch.',
  })
  @ApiOkResponse({
    description: 'Branch updated successfully.',
    type: UpdateBranchResult,
  })
  @ApiNotFoundResponse({
    description: 'Branch not found.',
  })
  @ApiConflictResponse({
    description: 'Branch code already exists.',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBranchDto,
  ): Promise<UpdateBranchResult> {
    return this.updateBranchUseCase.execute(
      BranchCommandMapper.toUpdate(id, dto),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete branch',
    description: 'Soft deletes a branch.',
  })
  @ApiOkResponse({
    description: 'Branch deleted successfully.',
    type: DeleteBranchResult,
  })
  @ApiNotFoundResponse({
    description: 'Branch not found.',
  })
  async delete(@Param('id') id: string): Promise<DeleteBranchResult> {
    return this.deleteBranchUseCase.execute(BranchQueryMapper.toDelete(id));
  }
}
