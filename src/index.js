import parseFile from './parsers.js';
import diff from './diff.js'
import getFormatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const obj1 = parseFile(filePath1);
  const obj2 = parseFile(filePath2);
  const diff = diff(obj1, obj2);
  const formatter = getFormatter(formatName);
  return formatter(diff);
};

export default genDiff;

const file1 = process.argv[2];
const file2 = process.argv[3];
const formatName = process.argv[4];
console.log(run(file1, file2, formatName));
