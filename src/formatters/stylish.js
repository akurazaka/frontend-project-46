const SPACES_PER_INDENT = 4;

const createIndent = (depth, extraSpaces = 0) => ' '.repeat(depth * SPACES_PER_INDENT - extraSpaces);

const formatLine = (sign, key, value, indent) => `${indent}${sign} ${key}: ${value}`;

const stylish = (nodes, depth = 1) => {
  const lines = nodes.map((node) => {
    const indent = createIndent(depth);
    switch (node.type) {
      case 'added':
        return formatLine('+', node.key, node.value, indent);
      case 'removed':
        return formatLine('-', node.key, node.value, indent);
      case 'unchanged':
        return formatLine(' ', node.key, node.value, indent);
      case 'changed':
        return [
          formatLine('-', node.key, node.oldValue, indent),
          formatLine('+', node.key, node.newValue, indent),
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${createIndent(depth, SPACES_PER_INDENT)}}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return ['{', ...lines, `${createIndent(depth - 1)}}`].join('\n');
};

export default stylish;