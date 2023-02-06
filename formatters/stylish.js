import _ from 'lodash';

const makeSymbol = (status) => {
  switch (status) {
    case 'added':
      return '+';
    case 'updated':
      return '+';
    case 'removed':
      return '-';
    case 'oldData':
      return '-';
    default:
      return ' ';
  }
};

const buildStylishFormat = (collection) => {
  const replacer = ' ';
  const spaceCount = 2;

  const iter = (coll, depth) => {
    const indentSize = depth * spaceCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spaceCount);
    const lines = coll.map((el) => {
      const symbol = makeSymbol(el.type);
      if (el.children.length === 0) {
        if (_.isArray(el.value)) {
          return `${currentIndent}${symbol} ${el.name}: ${iter(el.value, depth + 2)}`;
        }
        return `${currentIndent}${symbol} ${el.name}: ${el.value}`;
      }
      return `${currentIndent}${symbol} ${el.name}: ${iter(el.children, depth + 2)}`;
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(collection, 1, 1);
};

export default buildStylishFormat;
