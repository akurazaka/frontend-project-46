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
    return data;
  }

  const entries = Object.entries(data);
  const formattedEntries = entries.map(([key, val]) => `${space.repeat(currentIndent)}${key}: ${formatValue(val, level + 1)}`);
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
      state: changeType,
      value: newValue,
      oldValue: previousValue,
      newValue: updatedValue,
    } = diffNode;

    if (diffNode.state !== 'nested' && diffNode.state !== 'updated') {
      return `${space.repeat(currentIndent)}${changeTypes[changeType]}${propertyName}: ${formatValue(newValue, level)}`;
    }

    if (diffNode.state === 'updated') {
      return `${space.repeat(currentIndent)}${changeTypes[changeType][0]}${propertyName}: ${formatValue(previousValue, level)}\n${space.repeat(currentIndent)}${changeTypes[changeType][1]}${propertyName}: ${formatValue(updatedValue, level)}`;
    }

    if (diffNode.state === 'nested') {
      return `${space.repeat(currentIndent)}${changeTypes[changeType]}${propertyName}: {\n${diffNode.value.map((childNode) => processNode(childNode, level + 1)).join('\n')}\n${space.repeat(closingBracketIndent)}}`;
    }

    throw new Error(`Invalid node state - ${changeType}`);
  };
  return `{\n${diffTree.map((childNode) => processNode(childNode, 1)).join('\n')}\n}`;
};

export default stylish;
