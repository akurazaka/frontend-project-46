import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './json.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'json':
      return jsonFormatter;
    case 'stylish':
    default:
      return stylish;
  }
};

export default getFormatter;
