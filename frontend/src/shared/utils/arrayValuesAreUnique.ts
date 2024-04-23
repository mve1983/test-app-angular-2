export function arrayValuesAreUnique (value: any, index: any, array: any) {
  return array.indexOf(value) === array.lastIndexOf(value);
}
