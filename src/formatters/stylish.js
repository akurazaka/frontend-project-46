import _ from 'lodash';

const markers = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  nested: ' ',
};

const createIndent = (level) => {
  const space = ' ';
  return space.repeat(level * 4 - 2);
};

const convertToString = (data, level = 1) => {
  if (!_.isObject(data)) {
    return data;
  }
  const propertyNames = Object.keys(data);
  const formattedProperties = propertyNames.map(
    (property) => `${createIndent(level + 1)}  ${property}: ${convertToString(
      data[property],
      level + 1,
    )}`,
  );
  return `{\n${formattedProperties.join('\n')}\n  ${createIndent(level)}}`;
};

const formatStylishly = (data, level = 1) => {
  switch (data.type) {
    case 'added':
    case 'deleted':
    case 'unchanged':
      return `${createIndent(level)}${markers[data.type]} ${
        data.key
      }: ${convertToString(data.value, level)}`;
    case 'changed':
      return `${createIndent(level)}${markers.removed} ${
        data.key
      }: ${convertToString(data.valueBefore, level)}\n${createIndent(level)}${
        markers.added
      } ${data.key}: ${convertToString(data.valueAfter, level)}`;
    case 'nested':
      return `${createIndent(level)}  ${data.key}: {\n${data.children
        .map((child) => formatStylishly(child, level + 1))
        .join('\n')}\n ${createIndent(level)} }`;
    default:
      throw new Error(`Unknown type: ${data.type}`);
  }
};

export default (changes) => `{\n${changes.map((change) => formatStylishly(change, 1)).join('\n')}\n}`;
