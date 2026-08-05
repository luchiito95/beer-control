import { InventoryMovementResponse } from "./inventory-movement.response";

export class KardexResponse {

  items!: InventoryMovementResponse[];

  totalItems!: number;

  page!: number;

  pageSize!: number;

}