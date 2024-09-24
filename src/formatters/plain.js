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
      state: changeType, 
      value: newValue, 
      oldValue: previousValue, 
      newValue: updatedValue,
    } = diffNode;

    switch (diffNode.state) {
      case 'added':
        return `Property '${propertyName}' was ${changeType} with value: ${formatValue(newValue)}`;
      case 'updated':
        return `Property '${propertyName}' was ${changeType}. From ${formatValue(previousValue)} to ${formatValue(updatedValue)}`;
      case 'unchanged':
        return [];
      case 'removed':
        return `Property '${propertyName}' was ${changeType}`;
      case 'nested':
        return newValue.flatMap((el) => {
          const nestedKey = `${propertyName}.${el.key}`;
          const updatedEl = { ...el, key: nestedKey };
          return processNode(updatedEl);
        });
      default:
        throw new Error(`Invalid node state - ${changeType}`);
    }
  };
  return diffTree.flatMap(processNode).join('\n');
};

export default plain;
