import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (fileExt) => {
  if (!(fileExt in parsers)) {
    throw new Error(`Cannot get parser for "${fileExt}"`);
  }
  return parsers[fileExt];
};
