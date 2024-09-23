import stylish from './stylish.js';
import plain from './plain.js';

const formats = {
  stylish,
  plain,
  json: (data) => JSON.stringify(data, null, 2),
};

export default (data, format) => formats[format](data);
