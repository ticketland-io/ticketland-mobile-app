export const formatValue = (val = 0, min = 2, max = 4) => new Intl.NumberFormat(
  'en-US',
  {minimumFractionDigits: min, maximumFractionDigits: max},
).format(val)

export const fromBase = (input, baseDecimals = 9) => {
  const value = input / 10 ** baseDecimals

  return value
}
