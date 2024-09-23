import _ from 'lodash';

const markers = {
  matched: ' ',
  expected: '-',
  received: '+',
};
const getMarker = (stat) => {
  if (!(_.has(markers, stat))) {
    throw new Error(`Unknown stat "${stat}"`);
  }
  return markers[stat];
};

const composeIndent = (depth, spacesCount = 4, offset = 2) => ' '.repeat((depth * spacesCount) - offset);
const stringify = (item, depth) => {
  if (!(_.isPlainObject(item))) {
    return `${item}`;
  }
  const indentLines = composeIndent(depth);
  const items = Object
    .entries(item)
    .map(([key, value]) => `${indentLines}${getMarker('matched')} ${key}: ${stringify(value, depth + 1)}`);

  const indentBrackets = composeIndent(depth, 4, 4);
  return `{\n${items.join('\n')}\n${indentBrackets}}`;
};

export default (tree) => {
  const iter = (currentNode, depth) => {
    const indentLines = composeIndent(depth);
    const items = currentNode
      .map((node) => {
        const { stat, key } = node;
        if (stat === 'exchanged') {
          const { values } = node;
          const { from: valueFrom, to: valueTo } = values;
          return [
            `${indentLines}${getMarker('expected')} ${key}: ${stringify(valueFrom, depth + 1)}`,
            `${indentLines}${getMarker('received')} ${key}: ${stringify(valueTo, depth + 1)}`,
          ].join('\n');
        }
        if (stat === 'nested') {
          const { children } = node;
          return `${indentLines}${getMarker('matched')} ${key}: ${iter(children, depth + 1)}`;
        }
        const { value } = node;
        return `${indentLines}${getMarker(stat)} ${key}: ${stringify(value, depth + 1)}`;
      });
    const indentBrackets = composeIndent(depth, 4, 4);
    return `{\n${items.join('\n')}\n${indentBrackets}}`;
  };
  return iter(tree, 1);
};