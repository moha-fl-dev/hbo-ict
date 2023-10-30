export function clauseHasProperty<T>(clause: T): boolean {
  return clause && Object.keys(clause).some((key) => clause[key as keyof T]);
}
