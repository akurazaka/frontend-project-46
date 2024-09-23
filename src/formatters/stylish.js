const makeString = (obj, depth) => {
  const iter = (currentObj, currentDepth) => {
    const spacesCount = 1;
    const replacer = ' ';
    const indentSize = currentDepth * spacesCount;
    const bracketIndent = replacer.repeat(indentSize - 4);
    const currentIndent = replacer.repeat(indentSize);
    if (typeof currentObj === 'object' && currentObj !== null) {
      const line = Object.entries(currentObj)
        .map(([key, value]) => `\n${currentIndent}${key}: ${iter(value, currentDepth + 4)}`).join('');
      return `{${line}\n${bracketIndent}}`;
    }
    return currentObj;
  }
  const result = iter(obj, depth + 4);
  return result;
};

const stylish = (objects) => {
  const iter = (currentValue, depth) => {
    const spacesCount = 4;
    const replacer = ' ';
    const indentSize = depth * spacesCount;
    const cutIndentSize = depth * spacesCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const cutCurrentIndent = replacer.repeat(cutIndentSize);

    if (!currentValue.children) {
      if (currentValue.type === 'added') {
        return `${cutCurrentIndent}+ ${currentValue.name}: ${makeString(currentValue.value, indentSize)}\n`;
      } if (currentValue.type === 'unchanged') {
        return `${cutCurrentIndent}  ${currentValue.name}: ${makeString(currentValue.value, indentSize)}\n`;
      } if (currentValue.type === 'removed') {
        return `${cutCurrentIndent}- ${currentValue.name}: ${makeString(currentValue.value, indentSize)}\n`;
      } if (currentValue.type === 'updated') {
        return `${cutCurrentIndent}- ${currentValue.name}: ${makeString(currentValue.then, indentSize)}\n${cutCurrentIndent}+ ${currentValue.name}: ${makeString(currentValue.now, indentSize)}\n`;
      }
    }
    const nextObjects = currentValue.children.map((child) => iter(child, depth + 1)).join('');
    return [`${currentIndent}${currentValue.name}: {\n${nextObjects}`, `${currentIndent}}\n`].join('');
  };
  const result = objects.map((object) => iter(object, 1)).join('');
  return `{\n${result}}`;
};

export default stylish;