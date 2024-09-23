import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};

const parseData = (extension, data) => {
  const parser = parsers[extension];
  if (!parser) {
    throw new Error(`Unsupported file extension: ${extension}`);
  }
  return parser(data);
};

export default parseData;
