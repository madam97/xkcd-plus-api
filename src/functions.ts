export const random = (to: number, from: number): number => {
  return Math.floor(Math.random() * from + to)
}

export const zeroPad = (num: number, length: number): string => {
  return String(num).padStart(length, '0');
}