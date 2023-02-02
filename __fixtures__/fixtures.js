import _ from 'lodash';

const createToken = (name, value = '', type = ' ', children = []) => ({
  name,
  type,
  value,
  children,
});

const mapValueObject = (obj) => {
  const keys = Object.keys(obj);
  const tokens = keys.map((el) => {
    if (!_.isObject(obj[el])) {
      return createToken(el, obj[el], ' ');
    }
    return createToken(el, mapValueObject(obj[el]), ' ');
  });
  return tokens;
};

const node = createToken;

export const buildAbstractSyntax = (value1, value2) => {
  const keys = _.sortBy(_.union(Object.keys(value1), Object.keys(value2)));
  const tokens = keys.reduce((acc, el) => {
    if (_.has(value1, el) && _.has(value2, el)) {
      if (_.isObject(value1[el]) && _.isObject(value2[el])) {
        const child = buildAbstractSyntax(value1[el], value2[el]);
        acc.push(node(el, 'object', ' ', child));
        return acc;
      }

      if (_.isObject(value1[el]) && !_.isObject(value2[el])) {
        acc.push(node(el, mapValueObject(value1[el]), '-'));
        acc.push(node(el, value2[el], '+'));
        return acc;
      }
      if (!_.isObject(value1[el]) && _.isObject(value2[el])) {
        acc.push(node(el, mapValueObject(value2[el]), '-'));
        acc.push(node(el, value1[el], '+'));
        return acc;
      }
      if (value1[el] === value2[el]) {
        acc.push(node(el, value1[el]));
        return acc;
      }
      if (value1[el] !== value2[el]) {
        acc.push(node(el, value1[el], '-'));
        acc.push(node(el, value2[el], '+'));
        return acc;
      }
    }
    if (_.has(value1, el) && !_.has(value2, el)) {
      if (_.isObject(value1[el])) {
        acc.push(node(el, mapValueObject(value1[el]), '-'));
        return acc;
      }
      acc.push(node(el, value1[el], '-'));
      return acc;
    }
    if (!_.has(value1, el) && _.has(value2, el)) {
      if (_.isObject(value2[el])) {
        acc.push(node(el, mapValueObject(value2[el]), '+'));
        return acc;
      }
      acc.push(node(el, value2[el], '+'));
      return acc;
    }
    return acc;
  }, []);
  return tokens;
};

export const formatters = {
  stylish(collection) {
    const replacer = ' ';
    const spaceCount = 2;

    const iter = (coll, depth) => {
      const indentSize = depth * spaceCount;
      const currentIndent = replacer.repeat(indentSize);
      const bracketIndent = replacer.repeat(indentSize - spaceCount);
      const lines = coll.map((el) => {
        const [name, symbol, value, children] = [el.name, el.type, el.value, el.children];
        if (children.length === 0) {
          if (_.isArray(value)) {
            return `${currentIndent}${symbol} ${name}: ${iter(value, depth + 2)}`;
          }
          return `${currentIndent}${symbol} ${name}: ${value}`;
        }
        return `${currentIndent}${symbol} ${name}: ${iter(children, depth + 2)}`;
      });
      return [
        '{',
        ...lines,
        `${bracketIndent}}`,
      ].join('\n');
    };
    return iter(collection, 1, 1);
  },
  plain(collection) {
    let from;
    const iter = (coll, prop = '', val = '', type = '') => {
      if (coll.length === 0) {
        const rawValue = _.isArray(val) ? '[complex value]' : val;
        const value = typeof rawValue === 'string' ? `'${rawValue}'` : rawValue;
        // remove first '.' from the path
        const rootPath = prop.substring(1);
        switch (type) {
          case 'added':
            return `Property '${rootPath}' 'was added with value: ${value}`;

          case 'removed':
            return `Property '${rootPath}' was removed`;

          case 'oldData':
            from = value;
            break;

          case 'updated':
            return `Property '${rootPath}' was updated. From ${from} to ${value}`;
          default:
            return [];
        }
      }

      return coll.map((el) => {
        const root = prop.concat('.', el.name);
        return iter(el.children, root, el.value, el.type);
      });
    };
    return iter(collection).flat(Infinity).join('\n');
  },
};
