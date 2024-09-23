import path from 'path';
import fs from 'fs';
import { cwd } from 'process';
import parseData from './parsers.js';
import formatOutput from './formatters/index.js';
import buildDifferenceTree from './buildDifferenceTree.js';

const getFileData = (relativeFilePath) => {
  const absoluteFilePath = path.resolve(cwd(relativeFilePath), relativeFilePath);
  const fileContent = fs.readFileSync(absoluteFilePath, 'utf-8');
  return parseData(path.extname(relativeFilePath).slice(1), fileContent);
};

const generateDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = getFileData(filePath1);
  const data2 = getFileData(filePath2);
  const differenceTree = buildDifferenceTree(data1, data2);
  return formatOutput(differenceTree, format);
};

export default generateDiff;
