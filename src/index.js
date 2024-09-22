import parseFile from './parsers.js';
import genDiff from './diff.js';
import stylish from './formatters/stylish.js';

const run = (filePath1, filePath2) => {
  const obj1 = parseFile(filePath1);
  const obj2 = parseFile(filePath2);
  const diff = genDiff(obj1, obj2);
  return stylish(diff);
};

const file1 = process.argv[2];
const file2 = process.argv[3];
console.log(run(file1, file2));
