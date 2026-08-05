import { FilterOperator } from './enums/filter-operator.enum';
import { FilterValue } from './filter-value.type';

export interface SearchFilterProps {
  field: string;

  operator: FilterOperator;

  value: FilterValue;
}
