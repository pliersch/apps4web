export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// TODO test, improve
export function updateObjByPartial<T>(obj: T, partial: Partial<T>): any {
  for (const key in partial) {
    obj[key] = partial[key]!;
  }
}
