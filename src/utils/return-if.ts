import { Guard } from "../types"

/**
 * Return a value only if a given type guard returns positively.
 *
 * @param value - The value to be checked.
 * @param guard - The type guard to check.
 */
export function returnIf<T>(value: T, guard: Guard<NonNullable<T>>) {
  return guard(value) ? value : null
}
