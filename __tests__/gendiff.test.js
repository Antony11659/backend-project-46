import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf8');

test('genfiff', () => {
expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(readFile('expected.file.txt'))
});
//console.log(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')) === readFile('expected.file.txt'))
//console.log(readFile('expected.file.txt'));
//console.log(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
