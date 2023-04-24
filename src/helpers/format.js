export const formatValue = (val = 0, min = 2, max = 4) => new Intl.NumberFormat(
  'en-US',
  {minimumFractionDigits: min, maximumFractionDigits: max},
).format(val)
