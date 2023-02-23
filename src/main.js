import * as fs from 'fs';
import path from 'path';
import mapping from './parsers.js';
import buildAbstractSyntax from './buildAbstractSyntax.js';
import getFormatter from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const buildASTree = getFormatter(formatName);
  const file1Format = path.extname(file1);
  const file2Format = path.extname(file2);
  const parser1 = mapping[file1Format];
  const parser2 = mapping[file2Format];
  const obj1 = parser1(fs.readFileSync(path.resolve(file1), 'utf8'));
  const obj2 = parser2(fs.readFileSync(path.resolve(file2), 'utf8'));
  const collection = buildAbstractSyntax(obj1, obj2);
  return buildASTree(collection);
};
export default genDiff;
