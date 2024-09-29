import _ from 'lodash';

const buildDifferenceTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = [...new Set([...keys1, ...keys2])];
  const sortedKeys = _.orderBy(keys);

  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', value: buildDifferenceTree(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, type: 'updated', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });

  return result;
};

export default buildDifferenceTree;
