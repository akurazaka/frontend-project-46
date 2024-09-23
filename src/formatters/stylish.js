import _ from 'lodash';

const formatKeyName = (key, changeType, element) => {
  if ((changeType === 'added') || ((changeType === 'changed') && (Object.hasOwn(element, 'oldValue')))) {
    return `  + ${key}`;
  } 
  if (changeType === 'deleted') {
    return `  - ${key}`;
  }
  return `    ${key}`;
};

const transformDiffArrayToObject = (diffArray) => {
  return diffArray.reduce((accumulator, element) => {
    const formattedKey = formatKeyName(element.name, element.diff, element);
    const updatedAccumulator = accumulator;
    if (Object.hasOwn(element, 'oldValue')) {
      const oldKey = `  - ${element.name}`;
      if (Array.isArray(element.value)) {
        return {
          ...updatedAccumulator, 
          [oldKey]: element.oldValue, 
          [formattedKey]: transformDiffArrayToObject(element.value),
        };
      };
      return {
        ...updatedAccumulator, 
        [oldKey]: element.oldValue, 
        [formattedKey]: element.value,
      };
    } 
    if (Array.isArray(element.value)) {
      return {
        ...updatedAccumulator, 
        [formattedKey]: transformDiffArrayToObject(element.value),
      };
    };
    return {
      ...updatedAccumulator, 
      [formattedKey]: element.value,
    };
  }, {});
};

const formatObjectToString = (objectDiff, indent = '    ') => {
  const recursiveStringify = (data, level) => {
    if (!_.isObject(data)) {
      return `${data}`;
    };
    const entries = Object.entries(data);
    const resultString = entries.reduce((acc, [key, value]) => {
      const currentIndent = (key.startsWith(' ')) ? (indent.repeat(level - 1)) : indent.repeat(level);
      const newAccumulator = `${acc}${currentIndent}${key}: ${recursiveStringify(value, level + 1)}\n`;
      return newAccumulator;
    }, '');
    return `{\n${resultString}${indent.repeat(level - 1)}}`;
  };
  return recursiveStringify(objectDiff, 1);
};

const stylishDiffFormatter = (diffArray) => formatObjectToString(transformDiffArrayToObject(diffArray));

export default stylishDiffFormatter;
