import _ from 'lodash';

const formatValue = (input) => {
  if (_.isObject(input)) {
    return '[complex value]';
  }
  if (typeof input === 'string') {
    return `'${input}'`;
  }
  return input;
};

const plain = (diffTree) => {
  const processNode = (node) => {
    const {
      name, status, currentValue, previousValue, updatedValue,
    } = node;

    if (!status) {
      throw new Error(`Node is missing status: ${JSON.stringify(node)}`);
    }

    switch (status) {
      case 'added':
        return `Property '${name}' was ${status} with value: ${formatValue(currentValue)}`;
      case 'updated':
        return `Property '${name}' was ${status}. From ${formatValue(previousValue)} to ${formatValue(updatedValue)}`;
      case 'unchanged':
        return [];
      case 'removed':
        return `Property '${name}' was ${status}`;
      case 'nested':
        return currentValue.flatMap((childNode) => {
          const childKey = `${name}.${childNode.name}`;
          const updatedChildNode = { ...childNode, name: childKey };
          return processNode(updatedChildNode);
        });
      default:
        throw new Error(`Invalid node status - ${status}`);
    }
  };
  return diffTree.flatMap(processNode).join('\n');
};

export default plain;
