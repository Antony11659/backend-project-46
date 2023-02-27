import * as fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildASTree from './buildASTree.js';
import getFormatter from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const format = getFormatter(formatName);
  const file1Format = path.extname(file1);
  const file2Format = path.extname(file2);
  const parser1 = parse(file1Format);
  const parser2 = parse(file2Format);
  const obj1 = parser1(fs.readFileSync(path.resolve(file1), 'utf8'));
  const obj2 = parser2(fs.readFileSync(path.resolve(file2), 'utf8'));
  const collection = buildASTree(obj1, obj2);
  return format(collection);
};
export default genDiff;
