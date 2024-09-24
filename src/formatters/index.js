import stylish from './stylish.js';
import plain from './plain.js';

const getFormat = (tree, formatter = 'stylish') => {
  switch (formatter) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree, null, 2);
    default:
      throw new Error(`Unknown formatter: ${formatter}`);
  }
};

export default getFormat;
