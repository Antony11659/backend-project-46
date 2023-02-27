import yaml from 'js-yaml';

const mapping = {
  '.json': (file) => JSON.parse(file),
  '.yml': (file) => yaml.load(file),
  '.yaml': (file) => yaml.load(file),
};

const parse = (file) => {
  if (!mapping[file]) {
    throw new Error(`Unsupported file type: ${file}`);
  }
  return mapping[file];
};

export default parse;
