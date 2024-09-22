import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
};


export default (extname, data) => {
  if (!parsers[extname]) {
    throw new Error(`Cannot find parser for "${extname}"`);
  }
  return parsers[extname](data);
};
