import _ from 'lodash';

const sortAndStringify = (array) => {
  const sortedArray = array.sort((a, b) => a[3].toUpperCase().localeCompare(b[3].toUpperCase()));
  return `{\n${sortedArray.join(' \n')}\n}`;
};

const genDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const result = (keys.reduce((acc, el) => {
    if (Object.hasOwn(obj1, el) && Object.hasOwn(obj2, el)) {
      if (obj1[el] === obj2[el]) {
        acc.push(`   ${el}: ${obj1[el]}`);
      } else {
        acc.push(` - ${el}: ${obj1[el]}`);
        acc.push(` + ${el}: ${obj2[el]}`);
      }
    }
    if (Object.hasOwn(obj1, el) && !Object.hasOwn(obj2, el)) {
      acc.push(` - ${el}: ${obj1[el]}`);
    }
    if (!Object.hasOwn(obj1, el) && Object.hasOwn(obj2, el)) {
      acc.push(` + ${el}: ${obj2[el]}`);
    }
    return acc;
  }, []));
  return sortAndStringify(result);
};
export default genDiff;
