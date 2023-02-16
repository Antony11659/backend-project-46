import _ from 'lodash';

const makeValue = (value) => {
  const rawValue = _.isArray(value) || _.isObject(value) ? '[complex value]' : value;
  if (typeof rawValue === 'string' && rawValue !== '[complex value]') {
    return `'${rawValue}'`;
  }
  return rawValue;
};

const buildPlainFormat = (collection) => {
  const iter = (coll, prop = '', val = '', type = '', oldValue = '') => {
    if (coll.length === 0) {
      const value = makeValue(val);
      const from = makeValue(oldValue);
      // remove first '.' from the parentRoot
      const rootPath = prop.substring(1);
      switch (type) {
        case 'added':
          return `Property '${rootPath}' was added with value: ${value}`;

        case 'removed':
          return `Property '${rootPath}' was removed`;

        case 'oldData':
          //  flat() will delete []
          return [];

        case 'updated':
          return `Property '${rootPath}' was updated. From ${from} to ${value}`;

        case 'equal':
          return [];

        case ' ':
          return [];

        default:
          throw new Error('type is invalid!');
      }
    }

    return coll.map((el) => {
      const root = prop.concat('.', el.name);
      return iter(el.children, root, el.value, el.type, el.updatedFrom);
    });
  };
  return iter(collection).flat(Infinity).join('\n');
};

export default buildPlainFormat;
