/*isNaN(parsed): This checks if the result of the conversion is NaN (Not a Number). If it is NaN, it means the string didn't represent a valid number, so the original string is returned.*/
export function parseId(id: string): string | number {
  const parsed = Number(id);
  return isNaN(parsed) ? id : parsed;
}
