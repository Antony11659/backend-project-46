import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return (keys.reduce((acc, el) => {
    if (Object.hasOwn(obj1, el) && Object.hasOwn(obj2, el)) {
      if (obj1[el] === obj2[el]) {
        acc.push(`  ${el}: ${obj1[el]}`);
      } else {
        acc.push(`- ${el}: ${obj1[el]}`);
        acc.push(`+ ${el}: ${obj2[el]}`);
      }
    }
    if (Object.hasOwn(obj1, el) && !Object.hasOwn(obj2, el)) {
      acc.push(`- ${el}: ${obj1[el]}`);
    }
    if (!Object.hasOwn(obj1, el) && Object.hasOwn(obj2, el)) {
      acc.push(`+ ${el}: ${obj2[el]}`);
    }
    return acc;
  }, []));
};
export default genDiff;
