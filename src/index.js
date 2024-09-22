import { readFileSync } from 'fs';
import path from 'path';

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileData = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileData);
};

const compareFiles = (data1, data2, format) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = [...new Set([...keys1, ...keys2])];

  const result = allKeys.map((key) => {
    if (data1[key] === data2[key]) {
      return `  ${key}: ${data1[key]}`;
    }
    if (!data2[key]) {
      return `- ${key}: ${data1[key]}`;
    }
    if (!data1[key]) {
      return `+ ${key}: ${data2[key]}`;
    }
    return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
  }).join('\n');

  return result;
};

export default compareFiles;
