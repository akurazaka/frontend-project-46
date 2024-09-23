import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (result, type) => {
  if (type === 'plain') {
    return plain(result);
  }
  if (type === 'json') {
    return json(result);
  }
  return stylish(result);
};

export default formatter;