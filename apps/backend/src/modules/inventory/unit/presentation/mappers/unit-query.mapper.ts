import { SearchCriteria } from '../../../../../core/application/search/search-criteria';

import { DeleteUnitCommand } from '../../application/delete-unit/delete-unit.command';

import { GetUnitQuery } from '../../application/queries/get-unit/get-unit.query';
import { SearchUnitsQuery } from '../../application/queries/search-units/search-units.query';

export class UnitQueryMapper {
  static toGet(id: string): GetUnitQuery {
    return new GetUnitQuery(id);
  }

  static toDelete(id: string): DeleteUnitCommand {
    return new DeleteUnitCommand(id);
  }

  static toSearch(criteria: SearchCriteria): SearchUnitsQuery {
    return new SearchUnitsQuery(criteria);
  }
}
