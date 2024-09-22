import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileData = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(fileData);
};

const compareFiles = (data1, data2) => {
    const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  
    const result = keys.map((key) => {
      if (_.has(data1, key) && !_.has(data2, key)) {
        return `  - ${key}: ${data1[key]}`;
      }
      if (!_.has(data1, key) && _.has(data2, key)) {
        return `  + ${key}: ${data2[key]}`;
      }
      if (data1[key] !== data2[key]) {
        return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
      }
      return `    ${key}: ${data1[key]}`;
    });
    return `{\n${result.join('\n')}\n}`;
  };
  
export default compareFiles;


