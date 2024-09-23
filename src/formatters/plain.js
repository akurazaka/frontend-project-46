import _ from 'lodash';

const formatValue = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  return typeof val === 'string' ? `'${val}'` : val;
};

const generatePlainOutput = (item, parentKey = '') => {
  switch (item.type) {
    case 'added':
      return `Property '${parentKey}${item.key}' was added with value: ${formatValue(item.value)}`;
    case 'deleted':
      return `Property '${parentKey}${item.key}' was removed`;
    case 'unchanged':
      return null;
    case 'changed':
      return `Property '${parentKey}${item.key}' was updated. From ${formatValue(item.valueBefore)} to ${formatValue(item.valueAfter)}`;
    case 'nested':
      return item.children.map((child) => generatePlainOutput(child, `${parentKey}${item.key}.`))
        .filter((result) => result !== null).join('\n');
    default:
      throw new Error(`Unknown type: ${item.type}`);
  }
};

export default (plainDiff) => `${plainDiff.map((element) => generatePlainOutput(element)).join('\n').trim()}`;
