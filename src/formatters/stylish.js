import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    const indent = getIndent(depth + 1);
    const closingIndent = getIndent(depth);
    const lines = Object.entries(value)
      .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);
    return `{\n${lines.join('\n')}\n${closingIndent}}`;
  }
  return String(value);
};

const stylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    const indent = getIndent(depth);
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'nested':
        return `${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n');
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  const closingIndent = getIndent(depth - 1);
  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default stylish;

