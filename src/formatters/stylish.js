import _ from 'lodash';

const statusMarkers = {
  matched: ' ',
  expected: '-',
  received: '+',
};

const getStatusMarker = (status) => {
  if (!(_.has(statusMarkers, status))) {
    throw new Error(`Unknown status "${status}"`);
  }
  return statusMarkers[status];
};

const createIndent = (level, spaceCount = 4, offset = 2) => ' '.repeat((level * spaceCount) - offset);
const convertToString = (element, level) => {
  if (!(_.isPlainObject(element))) {
    return `${element}`;
  }
  const indentLines = createIndent(level);
  const entries = Object
    .entries(element)
    .map(([property, value]) => `${indentLines}${getStatusMarker('matched')} ${property}: ${convertToString(value, level + 1)}`);

  const indentBrackets = createIndent(level, 4, 4);
  return `{\n${entries.join('\n')}\n${indentBrackets}}`;
};

export default (dataTree) => {
  const traverse = (currentNode, level) => {
    const indentLines = createIndent(level);
    const entries = currentNode
      .map((node) => {
        const { status, property } = node;
        if (status === 'exchanged') {
          const { values } = node;
          const { from: oldValue, to: newValue } = values;
          return [
            `${indentLines}${getStatusMarker('expected')} ${property}: ${convertToString(oldValue, level + 1)}`,
            `${indentLines}${getStatusMarker('received')} ${property}: ${convertToString(newValue, level + 1)}`,
          ].join('\n');
        }
        if (status === 'nested') {
          const { children } = node;
          return `${indentLines}${getStatusMarker('matched')} ${property}: ${traverse(children, level + 1)}`;
        }
        const { value } = node;
        return `${indentLines}${getStatusMarker(status)} ${property}: ${convertToString(value, level + 1)}`;
      });
    const indentBrackets = createIndent(level, 4, 4);
    return `{\n${entries.join('\n')}\n${indentBrackets}}`;
  };
  return traverse(dataTree, 1);
};
