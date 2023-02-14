import _ from 'lodash';

const makeValue = (value) => {
  const rawValue = _.isArray(value) ? '[complex value]' : value;
  if (typeof rawValue === 'string' && rawValue !== '[complex value]') {
    return `'${rawValue}'`;
  }
  return rawValue;
};

const buildPlainFormat = (collection) => {
  let from;
  const iter = (coll, prop = '', val = '', type = '') => {
    if (coll.length === 0) {
      const value = makeValue(val);
      // remove first '.' from the parentRoot
      const rootPath = prop.substring(1);
      switch (type) {
        case 'added':
          return `Property '${rootPath}' was added with value: ${value}`;

        case 'removed':
          return `Property '${rootPath}' was removed`;

        case 'oldData':
          from = value;
          break;

        case 'updated':
          return `Property '${rootPath}' was updated. From ${from} to ${value}`;

        case 'equal':
          //  flat() will remove []
          return [];

        case ' ':
          return [];

        default:
          throw new Error('type is invalid!');
      }
    }

    return coll.map((el) => {
      const root = prop.concat('.', el.name);
      return iter(el.children, root, el.value, el.type);
    });
  };
  return iter(collection).flat(Infinity).join('\n');
};

export default buildPlainFormat;
