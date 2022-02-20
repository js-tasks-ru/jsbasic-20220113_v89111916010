function getMinMax(str) {
  const dumpArr = str.split(' ');

  const clearArr = dumpArr.filter(item => {
    const transformItem = +item;

    if (isFinite(transformItem)) {
      return transformItem
    }
  });

  const result = {};
  let minValue;
  let maxValue;

  minValue = Math.min(...clearArr);
  maxValue = Math.max(...clearArr);

  result.min = minValue;
  result.max = maxValue;
  return result;

}
