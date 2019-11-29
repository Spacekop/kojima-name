export default (array, fn) => {
  let obj = {};

  array.forEach(entry => {
      const result = fn(entry);
      obj[result.key] = result.value;
  });

  return obj;
};
