import _ from 'lodash';
import * as fs from 'fs';
import path from 'path';

const sortAndStringify = (array) => {
  const sortedArray = array.sort((a, b) => a[3].toUpperCase().localeCompare(b[3].toUpperCase()));
  return `{\n${sortedArray.join(' \n')}\n}`;
};

const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(file1), 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(file2), 'utf8'));
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
