// мода,
export const getMode = (items) => {
  const sorted = items.sort((a, b) => b[1] - a[1]);
  const [firstMostRepeated] = sorted;
  const [, mostRepeatedNumber] = firstMostRepeated;
  return sorted
    .filter(([, value]) => value === mostRepeatedNumber)
    .map(([key]) => key).join(',');
}
