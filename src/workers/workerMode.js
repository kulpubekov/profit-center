// мода,
export const getMode = (items) => {
  const sorted = items.sort((a, b) => b[1] - a[1]);
  const [repeatCount] = sorted;
  const [, repeatedValue] = repeatCount;
  return sorted
    .filter(([, value]) => value === repeatedValue)
    .map(([key]) => key).join(',');
}
