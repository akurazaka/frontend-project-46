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
    const { key: propertyName, type: changeType } = diffNode || {};

    switch (changeType) {
      case 'added': {
        const { value } = diffNode;
        return `Property '${propertyName}' was ${changeType} with value: ${formatValue(value)}`;
      }

      case 'updated': {
        const { value1, value2 } = diffNode;
        return `Property '${propertyName}' was ${changeType}. From ${formatValue(value1)} to ${formatValue(value2)}`;
      }

      case 'unchanged':
        return [];

      case 'removed':
        return `Property '${propertyName}' was ${changeType}`;

      case 'nested': {
        const { value } = diffNode;
        return value.flatMap((el) => {
          const nestedKey = `${propertyName}.${el.key}`;
          const updatedEl = { ...el, key: nestedKey };
          return processNode(updatedEl);
        });
      }

      default:
        throw new Error(`Invalid node type - ${changeType}`);
    }
  };

  return diffTree.flatMap(processNode).join('\n');
};

export default plain;
