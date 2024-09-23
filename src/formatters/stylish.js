import _ from 'lodash';

const replacer = ' ';
const spaceCount = 4;

const getIndentSize = (depth) => depth * spaceCount;
const getIndent = (depth) => replacer.repeat(getIndentSize(depth) - 2);
const getIndentBracket = (depth) => replacer.repeat(getIndentSize(depth) - spaceCount);

const createString = (type, key, value, indent) => `${indent}${type}${key}: ${value}`;

const stringify = (data, count) => {
  if (!_.isObject(data)) { return data; }

  const indent = getIndent(count);
  const indentBracket = getIndentBracket(count);
  const result = Object.keys(data).map((key) => createString('  ', key, stringify(data[key], count + 1), indent));

  return ['{', ...result, `${indentBracket}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (currentValue, count) => {
    const indent = getIndent(count);
    const indentBracket = getIndentBracket(count);
    const result = currentValue.map((item) => {
      switch (item.type) {
        case 'added':
          return createString('+ ', item.key, stringify(item.value, count + 1), indent);
        case 'deleted':
          return createString('- ', item.key, stringify(item.value, count + 1), indent);
        case 'changed':
          return `${createString('- ', item.key, stringify(item.value.old, count + 1), indent)}\n${createString('+ ', item.key, stringify(item.value.new, count + 1), indent)}`;
        case 'node':
          return createString('  ', item.key, iter(item.children, count + 1), indent);
        case 'unchanged':
          return createString('  ', item.key, stringify(item.value, count + 1), indent);
        default:
          throw new Error(`Error type - ${item.type}`);
      }
    });

    return ['{', ...result, `${indentBracket}}`].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;