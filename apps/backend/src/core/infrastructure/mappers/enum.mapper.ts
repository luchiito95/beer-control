export function mapEnum<T>(value: string): T {
  return value as unknown as T;
}