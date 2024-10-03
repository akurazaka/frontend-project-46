import _ from 'lodash';

const getIndent = (level, offset = 0) => ' '.repeat(level * 4 - offset);

const formatValue = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }

  const currentIndent = getIndent(level + 1);
  const closingBracketIndent = getIndent(level);

  const entries = Object.entries(data);
  const formattedEntries = entries.map(
    ([key, val]) => `${currentIndent}${key}: ${formatValue(val, level + 1)}`,
  );

  return ['{', ...formattedEntries, `${closingBracketIndent}}`].join('\n');
};

const stylish = (diffTree) => {
  const processNode = (diffNode, level) => {
    const currentIndent = getIndent(level, 2);
    const closingBracketIndent = getIndent(level);

    const { key: propertyName, type: changeType } = diffNode;

    switch (changeType) {
      case 'added': {
        const { value } = diffNode;
        return `${currentIndent}+ ${propertyName}: ${formatValue(value, level)}`;
      }

      case 'removed': {
        const { value } = diffNode;
        return `${currentIndent}- ${propertyName}: ${formatValue(value, level)}`;
      }

      case 'unchanged': {
        const { value } = diffNode;
        return `${currentIndent}  ${propertyName}: ${formatValue(value, level)}`;
      }

      case 'updated': {
        const { value1, value2 } = diffNode;
        return `${currentIndent}- ${propertyName}: ${formatValue(value1, level)}\n${currentIndent}+ ${propertyName}: ${formatValue(value2, level)}`;
      }

      case 'nested': {
        const { value } = diffNode;
        return `${currentIndent}  ${propertyName}: {\n${value.map((childNode) => processNode(childNode, level + 1)).join('\n')}\n${closingBracketIndent}}`;
      }

      default:
        throw new Error(`Invalid node type - ${changeType}`);
    }
  };

  return `{\n${diffTree.map((childNode) => processNode(childNode, 1)).join('\n')}\n}`;
};

export default stylish;
