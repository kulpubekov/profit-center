const getAllItems = (obj) => Object.entries(obj).reduce((acc, [key, value]) => ([...acc, ...Array(value).fill(+key)]), []);

// стандартное отклонение,
export const getStandardDeviation = (obj) => {
  const array = getAllItems(obj);
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.round(Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n));
}

// среднее,
export const getAverage = (obj) => {
  const arr = getAllItems(obj);
  const sum = arr.reduce((sum, val) => (sum += val));
  return Math.round(sum / arr.length);
}


// мода,
export const getMode = (obj) => {
  const sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  const [repeatCount] = sorted;
  const [, repeatedValue] = repeatCount;
  return sorted.filter(([, value]) => value === repeatedValue).map(([key]) => key).join(',');
}

// медиана
export const getMedian = (obj) => {
  const arr = getAllItems(obj);
  const length = arr.length;
  const arrSort = arr.sort();;
  const mid = Math.ceil(length / 2);
  return length % 2 === 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
}


const second = 1000;
export const millisToMinutesAndSeconds = ms => ms / second;

