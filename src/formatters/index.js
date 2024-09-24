import stylish from './stylish.js';
import plain from './plain.js';

const getFormat = (tree, formatter = 'stylish') => {
  if (formatter === 'stylish') {
    return stylish(tree);
  }
  if (formatter === 'plain') {
    return plain(tree);
  }
  if (formatter === 'json') {
    return JSON.stringify(tree, null, 2);
  }
};

export default getFormat;