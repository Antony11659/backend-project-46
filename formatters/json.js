const buildJsonFormat = (coll) => {
  const result = coll.reduce((acc, el) => {
    acc[el.name] = { ...el };
    return acc;
  }, {});
  return JSON.parse(JSON.stringify(result));
};

export default buildJsonFormat;
