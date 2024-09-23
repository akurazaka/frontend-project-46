const plain = (diff) => {
    const iter = (nodes, parentKey = '') => {
      return nodes.flatMap((node) => {
        const { key, action, value, children } = node;
        const currentKey = parentKey ? `${parentKey}.${key}` : key;
  
        switch (action) {
          case 'added':
            return `Property '${currentKey}' was added with value: ${value === null ? 'null' : value}`;
          case 'removed':
            return `Property '${currentKey}' was removed`;
          case 'updated':
            return `Property '${currentKey}' was updated. From ${value.old} to ${value.new}`;
          case 'nested':
            return iter(children, currentKey);
          default:
            return [];
        }
      }).join('\n');
    };
  
    return iter(diff);
  };
  
  export default plain;
  