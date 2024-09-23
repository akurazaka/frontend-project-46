import _ from 'lodash';

const space = ' ';
const SPACES_PER_INDENT = 4;

const calculateIndent = (level) => level * SPACES_PER_INDENT;
const buildIndent = (level) => space.repeat(calculateIndent(level) - 2);
const buildBracketIndent = (level) => space.repeat(calculateIndent(level) - SPACES_PER_INDENT);

const formatLine = (prefix, key, value, indent) => `${indent}${prefix}${key}: ${value}`;

const formatData = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const indent = buildIndent(depth);
  const bracketIndent = buildBracketIndent(depth);
  const formattedEntries = Object.keys(data).map((key) =>
    formatLine('  ', key, formatData(data[key], depth + 1), indent)
  );

  return ['{', ...formattedEntries, `${bracketIndent}}`].join('\n');
};

const renderTree = (tree) => {
  const traverse = (nodes, depth) => {
    const indent = buildIndent(depth);
    const bracketIndent = buildBracketIndent(depth);
  
    const lines = nodes.map((node) => {
      switch (node.type) {
        case 'added':
          return formatLine('+ ', node.key, formatData(node.value, depth + 1), indent);
        case 'deleted':
          return formatLine('- ', node.key, formatData(node.value, depth + 1), indent);
        case 'changed':
          const oldValue = node.value?.old ?? 'undefined';
          const newValue = node.value?.new ?? 'undefined';
          return `${formatLine('- ', node.key, formatData(oldValue, depth + 1), indent)}\n${formatLine('+ ', node.key, formatData(newValue, depth + 1), indent)}`;
        case 'node':
        case 'nested':
          return formatLine('  ', node.key, traverse(node.children, depth + 1), indent);
        case 'unchanged':
          return formatLine('  ', node.key, formatData(node.value, depth + 1), indent);
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return traverse(tree, 1);
};

export default renderTree;
