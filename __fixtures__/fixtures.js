import _ from 'lodash';

const createToken = (name, value = '', type = ' ', children = []) => ({
  name,
  type,
  value,
  children,
});

const node = createToken;

const mapValueObject = (obj) => {
  const keys = Object.keys(obj);
  const tokens = keys.map((el) => {
    if (!_.isObject(obj[el])) {
      return createToken(el, obj[el]);
    }
    return createToken(el, mapValueObject(obj[el]));
  });
  return tokens;
};

const buildAbstractSyntax = (value1, value2) => {
  const keys = _.sortBy(_.union(Object.keys(value1), Object.keys(value2)));
  const tokens = keys.reduce((acc, el) => {
    if (_.has(value1, el) && _.has(value2, el)) {
      if (_.isObject(value1[el]) && _.isObject(value2[el])) {
        const child = buildAbstractSyntax(value1[el], value2[el]);
        return [...acc, node(el, 'object', 'equal', child)];
      }

      if (_.isObject(value1[el]) && !_.isObject(value2[el])) {
        const newAcc = [...acc, node(el, mapValueObject(value1[el]), 'oldData')];
        return [...newAcc, node(el, value2[el], 'updated')];
      }
      if (!_.isObject(value1[el]) && _.isObject(value2[el])) {
        const newAcc = [...acc, node(el, value1[el], 'oldData')];
        return [...newAcc, node(el, mapValueObject(value2[el]), 'updated')];
      }
      if (value1[el] === value2[el]) {
        return [...acc, node(el, value1[el], 'equal')];
      }
      if (value1[el] !== value2[el]) {
        const newAcc = [...acc, node(el, value1[el], 'oldData')];
        return [...newAcc, node(el, value2[el], 'updated')];
      }
    }
    if (_.has(value1, el) && !_.has(value2, el)) {
      if (_.isObject(value1[el])) {
        return [...acc, node(el, mapValueObject(value1[el]), 'removed')];
      }
      return [...acc, node(el, value1[el], 'removed')];
    }
    if (!_.has(value1, el) && _.has(value2, el)) {
      if (_.isObject(value2[el])) {
        return [...acc, node(el, mapValueObject(value2[el]), 'added')];
      }
      return [...acc, node(el, value2[el], 'added')];
    }
    return acc;
  }, []);
  return tokens;
};

export default buildAbstractSyntax;
