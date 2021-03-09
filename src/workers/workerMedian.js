// медиана старое
export const getMedianOld = (obj) => {
  const arr = Object.entries(obj).reduce((acc, [key, value]) => ([...acc, ...Array(value).fill(+key)]), []);
  const length = Object.values(obj).reduce((acc, el) => acc + el, 0);
  const arrSort = arr.sort();
  const mid = Math.ceil(length / 2);
  return length % 2 === 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
}

// медиана
export const getMedian = (obj) => {
  const ordered = Object.keys(obj).sort().reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },{});

  const length = Object.values(ordered).reduce((acc, el) => acc + el, 0);
  const isEven = length % 2 === 0;
  let sum = 0;
  let isFound = false;
  const mid = Math.ceil(length / 2) +1;
  let res = [];

  Object.entries(ordered).forEach(([key, value]) => {
    if (isFound) {
      return false;
    } else {
      for(let i = 1; i <= value; i++) {
        res.push(+key)
        sum = sum + 1;
        if(sum === mid){
          sum = sum + 1;
          isFound = true;
          break;
        }
      }
    }
  });
  return isEven ? (res[res.length -1] + res[res.length-2])  /2: res[res.length -1]
}
