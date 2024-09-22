import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const ext = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

export default parseFile;
