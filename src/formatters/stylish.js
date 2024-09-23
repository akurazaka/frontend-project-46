const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const indent = getIndent(depth + 1);
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`
  );

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const stylish = (diff, depth = 1) => {
  const lines = diff.map((node) => {
    const indent = getIndent(depth);
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}\n${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`;
      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return lines.join('\n');
};


export default stylish;
