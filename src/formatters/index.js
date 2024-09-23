import stylish from './stylish.js';
import plain from './plain.js';

const formats = {
  stylish,
  plain,
  json: (data) => JSON.stringify(data, null, 2),
};

const formatOutput = (data, format) => {
  const formatter = formats[format] || formats.stylish;
  return formatter(data);
};

export default formatOutput;
