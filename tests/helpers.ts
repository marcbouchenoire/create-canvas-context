/**
 * Disable or replace a property from an object.
 *
 * @param object - The object containing the property.
 * @param property - The property's name.
 * @param [replacement] - An optional replacement value.
 * @returns A function to restore the original value.
 */
export function affect<T>(
  object: T,
  property: keyof T,
  replacement: any = undefined
) {
  const origin = object[property]

  object[property] = replacement

  return () => {
    object[property] = origin
  }
}
