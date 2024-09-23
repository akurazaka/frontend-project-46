const getIndent = (depth) => ' '.repeat(depth * 4);

const stylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    const indent = getIndent(depth);
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${node.value}`;
      case 'removed':
        return `${indent}- ${node.key}: ${node.value}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${node.value}`;
      case 'changed':
        return `${indent}- ${node.key}: ${node.oldValue}\n${indent}+ ${node.key}: ${node.newValue}`;
      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return lines.join('\n');
};

export default stylish;
