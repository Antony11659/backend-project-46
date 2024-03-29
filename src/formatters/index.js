import _ from 'lodash';
import buildJsonFormat from './json.js';
import buildPlainFormat from './plain.js';
import buildStylishFormat from './stylish.js';

const formatters = {
  stylish: buildStylishFormat,
  plain: buildPlainFormat,
  json: buildJsonFormat,
};
const getFormatter = (formatter) => {
  if (!_.has(formatters, [formatter])) {
    throw new Error('this formatter does not exist!');
  }
  return formatters[formatter];
};
export default getFormatter;
