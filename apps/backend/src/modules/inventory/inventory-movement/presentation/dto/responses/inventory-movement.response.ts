export class InventoryMovementResponse {

  id!: string;

  stockId!: string;

  warehouseId!: string;

  productId!: string;

  type!: string;

  reason!: string;

  source!: string;

  quantity!: number;

  balanceBefore!: number;

  balanceAfter!: number;

  unitCost!: number;

  totalCost!: number;

  performedBy!: string;

  performedAt!: Date;

  referenceId!: string | null;

  notes!: string | null;

}