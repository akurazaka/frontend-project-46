import _ from 'lodash';

const formatValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const plain = (diffTree) => {
  const processNode = (diffNode) => {
    const {
      key: propertyName,
      type: changeType,
      value: newValue,
      value1: previousValue,
      value2: updatedValue,
    } = diffNode || {};

    if (!propertyName || !changeType) {
      throw new Error('Invalid node structure - missing key or type');
    }

    switch (changeType) {
      case 'added':
        return `Property '${propertyName}' was ${changeType} with value: ${formatValue(newValue)}`;
      case 'updated':
        return `Property '${propertyName}' was ${changeType}. From ${formatValue(previousValue)} to ${formatValue(updatedValue)}`;
      case 'unchanged':
        return [];
      case 'removed':
        return `Property '${propertyName}' was ${changeType}`;
      case 'nested':
        if (!Array.isArray(newValue)) {
          throw new Error(`Expected an array for nested property '${propertyName}', but got ${typeof newValue}`);
        }
        return newValue.flatMap((el) => {
          const nestedKey = `${propertyName}.${el.key}`;
          const updatedEl = { ...el, key: nestedKey };
          return processNode(updatedEl);
        });
      default:
        throw new Error(`Invalid node type - ${changeType}`);
    }
  };

  if (!Array.isArray(diffTree)) {
    throw new Error('Invalid diffTree structure, expected an array');
  }

  return diffTree.flatMap(processNode).join('\n');
};

export default plain;
