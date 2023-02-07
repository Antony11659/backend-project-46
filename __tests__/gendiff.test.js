import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');

describe('genDiff_with_default_formatter', () => {
  test('genDiff_json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(readFile('expected.file.txt'));
  });

  test('genDiff_yml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(readFile('expected.file.txt'));
  });
});

describe('genDiff_with_plain_formatter', () => {
  const formatter = 'plain';
  test('genDiff_plain.json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), formatter)).toBe(readFile('expected.file.plain.txt'));
  });

  test('genDiff_plain_yml', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), formatter)).toBe(readFile('expected.file.plain.txt'));
  });
});

describe('genDiff_json_formatter', () => {
  const formatter = 'json';
  test('genDiff_json_format.json', () => {
    expect(JSON.stringify(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), formatter))).toBe(readFile('expected.file.json.txt'));
  });
  test('genDiff_json_format.yml', () => {
    expect(JSON.stringify(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), formatter))).toBe(readFile('expected.file.json.txt'));
  });
});
