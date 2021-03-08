// стандартное отклонение,
export const getStandardDeviation = (items) => {
  const frequencyCountTotal = items.reduce((sum, [, value]) => sum + (+value), 0);
  const totalSumOfValues = items.reduce((sum, [key, value]) => sum + (+key * +value), 0);
  const x = totalSumOfValues / frequencyCountTotal;
  const c = items
    .map(([key, count]) => Math.pow((+key) - x, 2) * (+count))
    .reduce((acc, el) => acc + el, 0);
  return Math.sqrt(c / (frequencyCountTotal - 1))
}
