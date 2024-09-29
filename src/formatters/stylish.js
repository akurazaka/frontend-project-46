import _ from 'lodash';

const formatValue = (data, level) => {
  const indentLevel = 4;
  const currentIndent = level * indentLevel + indentLevel;
  const closingBracketIndent = currentIndent - indentLevel;
  const space = ' ';

  if (!_.isObject(data)) {
    return data;
  }

  const entries = Object.entries(data);
  const formattedEntries = entries.map(
    ([key, val]) => `${space.repeat(currentIndent)}${key}: ${formatValue(val, level + 1)}`,
  );
  return ['{', ...formattedEntries, `${space.repeat(closingBracketIndent)}}`].join('\n');
};

const stylish = (diffTree) => {
  const processNode = (diffNode, level) => {
    const indentLevel = 4;
    const offset = 2;
    const currentIndent = level * indentLevel - offset;
    const space = ' ';
    const closingBracketIndent = currentIndent + offset;
    const {
      key: propertyName,
      type: changeType,
      value: newValue,
      value1: previousValue,
      value2: updatedValue,
    } = diffNode;

    switch (changeType) {
      case 'added':
        return `${space.repeat(currentIndent)}+ ${propertyName}: ${formatValue(newValue, level)}`;

      case 'removed':
        return `${space.repeat(currentIndent)}- ${propertyName}: ${formatValue(newValue, level)}`;

      case 'unchanged':
        return `${space.repeat(currentIndent)}  ${propertyName}: ${formatValue(newValue, level)}`;

      case 'updated':
        return `${space.repeat(currentIndent)}- ${propertyName}: ${formatValue(previousValue, level)}\n${space.repeat(currentIndent)}+ ${propertyName}: ${formatValue(updatedValue, level)}`;

      case 'nested':
        return `${space.repeat(currentIndent)}  ${propertyName}: {\n${diffNode.value.map((childNode) => processNode(childNode, level + 1)).join('\n')}\n${space.repeat(closingBracketIndent)}}`;

      default:
        throw new Error(`Invalid node type - ${changeType}`);
    }
  };

  return `{\n${diffTree.map((childNode) => processNode(childNode, 1)).join('\n')}\n}`;
};

export default stylish;
