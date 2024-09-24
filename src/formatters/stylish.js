import _ from 'lodash';

const nodeStates = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  nested: '  ',
  updated: ['- ', '+ '],
};

const formatValue = (data, level) => {
  const indentWidth = 4;
  const currentIndent = level * indentWidth + indentWidth;
  const closingBracketIndent = currentIndent - indentWidth;
  const space = ' ';
  if (!_.isObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const formattedEntries = entries.map(([key, val]) => `${space.repeat(currentIndent)}${key}: ${formatValue(val, level + 1)}`);
  return ['{', ...formattedEntries, `${space.repeat(closingBracketIndent)}}`].join('\n');
};

const stylish = (diffTree) => {
  const processNode = (node, level) => {
    const indentWidth = 4;
    const leftShift = 2;
    const currentIndent = level * indentWidth - leftShift;
    const space = ' ';
    const closingBracketIndent = currentIndent + leftShift;

    const {
      name, status, currentValue, previousValue, updatedValue,
    } = node;

    if (node.status !== 'nested' && node.status !== 'updated') {
      return `${space.repeat(currentIndent)}${nodeStates[status]}${name}: ${formatValue(currentValue, level)}`;
    }
    if (node.status === 'updated') {
      return `${space.repeat(currentIndent)}${nodeStates[status][0]}${name}: ${formatValue(previousValue, level)}\n${space.repeat(currentIndent)}${nodeStates[status][1]}${name}: ${formatValue(updatedValue, level)}`;
    }
    if (node.status === 'nested') {
      return `${space.repeat(currentIndent)}${nodeStates[status]}${name}: {\n${node.currentValue.map((childNode) => processNode(childNode, level + 1)).join('\n')}\n${space.repeat(closingBracketIndent)}}`;
    }
    throw new Error(`Invalid node status - ${status}`);
  };
  return `{\n${diffTree.map((childNode) => processNode(childNode, 1)).join('\n')}\n}`;
};

export default stylish;
