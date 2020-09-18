export const chunkArray = (arr: any[], size: number) => {
  const [...newArr] = arr;
  var results = [];

  while (newArr.length) {
    results.push(newArr.splice(0, size));
  }

  return results;
}