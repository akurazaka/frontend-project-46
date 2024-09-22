import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const parseFile = (filePath) => {
  const extname = path.extname(filePath).slice(1); // Получаем расширение без точки
  const data = fs.readFileSync(filePath, 'utf8');
  
  if (!parse[extname]) {
    throw new Error(`Unsupported file type: ${extname}`);
  }

  return parse[extname](data);
};

export default parseFile;
