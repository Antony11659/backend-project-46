import * as fs from 'fs';
import path from 'path';
import mapping from './__fixtures__/parsers.js';
import { buildAbstractSyntax, formatters } from './__fixtures__/fixtures.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const buildASTree = formatters[format];
  const type = path.extname(file1);
  const parser = mapping[type];
  const obj1 = parser(fs.readFileSync(path.resolve(file1), 'utf8'));
  const obj2 = parser(fs.readFileSync(path.resolve(file2), 'utf8'));
  const collection = buildAbstractSyntax(obj1, obj2);
  return buildASTree(collection);
};
export default genDiff;
