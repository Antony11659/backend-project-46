const gendiff = require('../bin/gendiff.js');

test('gendiff', () => {
  expect(gendiff('././file1.json', '././file2.json').toBe('././expected_file.json'));
});

