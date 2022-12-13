import yaml from 'js-yaml';

const mapping = {
  '.json': (file) => JSON.parse(file),
  '.yml': (file) => yaml.load(file),
  '.yaml': (file) => yaml.load(file),
};
export default mapping;
