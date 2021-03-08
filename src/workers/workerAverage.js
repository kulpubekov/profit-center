// среднее,
export const getAverage = (items) => {
  const length = items.reduce((acc, [, count]) => acc + count, 0);
  const sum = items.reduce((sum, [key, value]) => sum + (+key * +value), 0);
  return Math.round(sum / length);
}
