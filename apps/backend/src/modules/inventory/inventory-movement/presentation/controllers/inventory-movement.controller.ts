import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import {

  GetInventoryMovementQuery,
  GetInventoryMovementUseCase,

  KardexQuery,
  KardexUseCase,

  SearchInventoryMovementsQuery,
  SearchInventoryMovementsUseCase,

} from '../../application';

import {

  KardexRequest,

  SearchInventoryMovementsRequest,

} from '../dto/requests';

@Controller('inventory-movements')
export class InventoryMovementController {

  constructor(

    private readonly getUseCase: GetInventoryMovementUseCase,

    private readonly searchUseCase: SearchInventoryMovementsUseCase,

    private readonly kardexUseCase: KardexUseCase,

  ) {}

  @Get(':id')
  async get(
    @Param('id') id: string,
  ) {

    return this.getUseCase.execute(

      new GetInventoryMovementQuery(id),

    );

  }

  @Post('search')
  async search(
    @Body() request: SearchInventoryMovementsRequest,
  ) {

    return this.searchUseCase.execute(

      new SearchInventoryMovementsQuery(

        request.criteria,

      ),

    );

  }

  @Post('kardex')
  async kardex(
    @Body() request: KardexRequest,
  ) {

    return this.kardexUseCase.execute(

      new KardexQuery(

        request.criteria,

      ),

    );

  }

}