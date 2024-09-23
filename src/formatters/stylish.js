import _ from 'lodash';

const space = ' ';
const SPACES_PER_INDENT = 4;

const getIndentSize = (depth) => depth * SPACES_PER_INDENT;
const getIndent = (depth) => space.repeat(getIndentSize(depth) - 2);
const getIndentBracket = (depth) => space.repeat(getIndentSize(depth) - SPACES_PER_INDENT);

const createString = (type, key, value, indent) => `${indent}${type}${key}: ${value}`;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const indent = getIndent(depth + 1);
  const indentBracket = getIndentBracket(depth);
  const lines = Object.entries(value).map(
    ([key, val]) => createString('  ', key, stringify(val, depth + 1), indent)
  );

  return ['{', ...lines, `${indentBracket}}`].join('\n');
};

const stylish = (diff, depth = 1) => {
  const indent = getIndent(depth);
  const indentBracket = getIndentBracket(depth);

  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return createString('+ ', node.key, stringify(node.value, depth), indent);
      case 'removed':
        return createString('- ', node.key, stringify(node.value, depth), indent);
      case 'changed':
        return `${createString('- ', node.key, stringify(node.value.old, depth + 1), indent)}
        ${createString('+ ', node.key, stringify(node.value.new, depth + 1), indent)}`;
      case 'nested':
        return createString('  ', node.key, stylish(node.children, depth + 1), indent);
      case 'unchanged':
        return createString('  ', node.key, stringify(node.value, depth), indent);
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return ['{', ...lines, `${indentBracket}}`].join('\n');
};

export default stylish;