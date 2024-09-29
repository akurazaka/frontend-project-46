import _ from 'lodash';

const getIndent = (level, offset = 0) => ' '.repeat(level * 4 - offset);

const formatValue = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }

  const currentIndent = getIndent(level + 1);
  const closingBracketIndent = getIndent(level);

  const entries = Object.entries(data);
  const formattedEntries = entries.map(
    ([key, val]) => `${currentIndent}${key}: ${formatValue(val, level + 1)}`,
  );

  return ['{', ...formattedEntries, `${closingBracketIndent}}`].join('\n');
};

const stylish = (diffTree) => {
  const processNode = (diffNode, level) => {
    const currentIndent = getIndent(level, 2);
    const closingBracketIndent = getIndent(level);

    const {
      key: propertyName,
      type: changeType,
      value: newValue,
      value1: previousValue,
      value2: updatedValue,
    } = diffNode;

    switch (changeType) {
      case 'added':
        return `${currentIndent}+ ${propertyName}: ${formatValue(newValue, level)}`;

      case 'removed':
        return `${currentIndent}- ${propertyName}: ${formatValue(newValue, level)}`;

      case 'unchanged':
        return `${currentIndent}  ${propertyName}: ${formatValue(newValue, level)}`;

      case 'updated':
        return `${currentIndent}- ${propertyName}: ${formatValue(previousValue, level)}\n${currentIndent}+ ${propertyName}: ${formatValue(updatedValue, level)}`;

      case 'nested':
        return `${currentIndent}  ${propertyName}: {\n${diffNode.value.map((childNode) => processNode(childNode, level + 1)).join('\n')}\n${closingBracketIndent}}`;

      default:
        throw new Error(`Invalid node type - ${changeType}`);
    }
  };

  return `{\n${diffTree.map((childNode) => processNode(childNode, 1)).join('\n')}\n}`;
};

export default stylish;
