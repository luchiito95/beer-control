import { SearchCriteria } from '../../../../../core/application/search/search-criteria';

import { DeleteBranchCommand } from '../../application/delete-branch/delete-branch.command';

import { GetBranchQuery } from '../../application/queries/get-branch/get-branch.query';
import { SearchBranchesQuery } from '../../application/queries/search-branches/search-branches.query';

export class BranchQueryMapper {
  static toGet(id: string): GetBranchQuery {
    return new GetBranchQuery(id);
  }

  static toDelete(id: string): DeleteBranchCommand {
    return new DeleteBranchCommand(id);
  }

  static toSearch(criteria: SearchCriteria): SearchBranchesQuery {
    return new SearchBranchesQuery(criteria);
  }
}
