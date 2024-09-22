import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parseFile = (filePath) => {
  const extname = path.extname(filePath);

  const data = fs.readFileSync(filePath, 'utf8');

  if (extname === '.json') {
    return JSON.parse(data);
  }

  if (extname === '.yml' || extname === '.yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unsupported file type: ${extname}`);
};

export default parseFile;
