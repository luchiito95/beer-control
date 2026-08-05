import { BaseEntity } from './base.entity';
import { BaseEntityProps } from './base-entity.props';

export abstract class AggregateRoot
  extends BaseEntity {

  protected constructor(
    props: BaseEntityProps,
  ) {

    super(props);

  }

}