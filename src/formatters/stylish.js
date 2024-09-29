import _ from 'lodash';

// Функция для получения отступов
const getIndent = (level, offset = 0) => {
  const indentLevel = 4;
  return ' '.repeat(level * indentLevel + offset);
};

const formatValue = (data, level) => {

  if (!_.isObject(data)) {
    return data;
  }

  const entries = Object.entries(data);
  const formattedEntries = entries.map(
    ([key, val]) => `${getIndent(level)}${key}: ${formatValue(val, level + 1)}`,
  );
  return ['{', ...formattedEntries, `${getIndent(level, -indentLevel)}}`].join('\n');
};

const stylish = (diffTree) => {
  const processNode = (diffNode, level) => {
    const {
      key: propertyName,
      type: changeType,
      value: newValue,
      value1: previousValue,
      value2: updatedValue,
    } = diffNode;

    switch (changeType) {
      case 'added':
        return `${getIndent(level)}+ ${propertyName}: ${formatValue(newValue, level)}`;

      case 'removed':
        return `${getIndent(level)}- ${propertyName}: ${formatValue(newValue, level)}`;

      case 'unchanged':
        return `${getIndent(level)}  ${propertyName}: ${formatValue(newValue, level)}`;

      case 'updated':
        return `${getIndent(level)}- ${propertyName}: ${formatValue(previousValue, level)}\n${getIndent(level)}+ ${propertyName}: ${formatValue(updatedValue, level)}`;

      case 'nested':
        return `${getIndent(level)}  ${propertyName}: {\n${diffNode.value.map((childNode) => processNode(childNode, level + 1)).join('\n')}\n${getIndent(level, -2)}}`;

      default:
        throw new Error(`Invalid node type - ${changeType}`);
    }
  };

  return `{\n${diffTree.map((childNode) => processNode(childNode, 1)).join('\n')}\n}`;
};

export default stylish;
