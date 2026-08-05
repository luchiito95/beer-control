export abstract class ValueObject<T> {

  protected constructor(
    protected readonly value: T,
  ) {}

  get rawValue(): T {
    return this.value;
  }

  equals(
    other: ValueObject<T>,
  ): boolean {

    if (!other) {
      return false;
    }

    if (this.constructor !== other.constructor) {
      return false;
    }

    return this.isEqualValue(
      other.value,
    );

  }

  protected abstract isEqualValue(
    value: T,
  ): boolean;

}