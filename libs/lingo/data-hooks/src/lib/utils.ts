/**
 * determines if a object has at least one property that is not null or undefined
 * @param clause T - the object to check
 * @returns
 */
export function clauseHasProperty<T>(clause: T): boolean {
  return clause && Object.keys(clause).some((key) => clause[key as keyof T]);
}
