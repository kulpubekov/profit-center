// медиана
export const getMedian = (obj) => {
  const arr = Object.entries(obj).reduce((acc, [key, value]) => ([...acc, ...Array(value).fill(+key)]), []);
  const length = arr.length;
  const arrSort = arr.sort();
  const mid = Math.ceil(length / 2);
  return length % 2 === 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
}
