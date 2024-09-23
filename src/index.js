import parseFile from './parsers.js';
import differ from './diff.js'
import getFormatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const obj1 = parseFile(filePath1);
  const obj2 = parseFile(filePath2);
  const diff = differ(obj1, obj2);
  const formatter = getFormatter(formatName);
  return formatter(diff);
};

export default genDiff;
