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

export const buildASTree = (collection) => {
  const replacer = ' ';
  const spaceCount = 2;

  const iter = (coll, depth) => {
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);
    const lines = coll.map((el) => {
      const [name, type, value, children] = [el.name, el.type, el.value, el.children];
      if (children.length === 0) {
        if (_.isArray(value)) {
          return `${currentIndent}${type} ${name}: ${iter(value, depth + 2)}`;
        }
        return `${currentIndent}${type} ${name}: ${value}`;
      }
      return `${currentIndent}${type} ${name}: ${iter(children, depth + 2)}`;
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(collection, 1, 1);
};
