import _ from 'lodash';

const changeTypes = {
  added: '+ ',
  removed: '- ',
  nested: '  ',
  updated: ['- ', '+ '],
  unchanged: '  ',
};

const formatValue = (data, level) => {
  const indentLevel = 4;
  const currentIndent = level * indentLevel + indentLevel;
  const closingBracketIndent = currentIndent - indentLevel;
  const space = ' ';

  if (!_.isObject(data)) {
    return typeof data === 'string' ? `'${data}'` : data;
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
      key: propertyName = '',
      type: changeType = '',
      value: newValue,
      value1: previousValue,
      value2: updatedValue,
    } = diffNode || {};

    if (!propertyName || !changeType) {
      throw new Error('Invalid node structure - missing key or type');
    }

    switch (changeType) {
      case 'added':
      case 'removed':
      case 'unchanged':
        return `${space.repeat(currentIndent)}${changeTypes[changeType]}${propertyName}: ${formatValue(newValue, level)}`;

      case 'updated':
        return `${space.repeat(currentIndent)}${changeTypes[changeType][0]}${propertyName}: ${formatValue(previousValue, level)}\n` +
               `${space.repeat(currentIndent)}${changeTypes[changeType][1]}${propertyName}: ${formatValue(updatedValue, level)}`;

      case 'nested':
        if (!Array.isArray(newValue)) {
          throw new Error(`Expected an array for nested property '${propertyName}', but got ${typeof newValue}`);
        }
        return `${space.repeat(currentIndent)}${changeTypes[changeType]}${propertyName}: {\n` +
               `${newValue.map((childNode) => processNode(childNode, level + 1)).join('\n')}\n` +
               `${space.repeat(closingBracketIndent)}}`;

      default:
        throw new Error(`Invalid node type - ${changeType}`);
    }
  };

  if (!Array.isArray(diffTree)) {
    throw new Error('Invalid diffTree structure, expected an array');
  }

  return `{\n${diffTree.map((childNode) => processNode(childNode, 1)).join('\n')}\n}`;
};

export default stylish;
