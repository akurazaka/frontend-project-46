import parseFile from '../src/parsers.js';
import path from 'path';

describe('parseFile', () => {
  test('should parse JSON file correctly', () => {
    const filePath = path.join(__dirname, '../__fixtures__/file1.json');
    const result = parseFile(filePath);
    const expected = {
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: {
          key: 'value',
          doge: { wow: '' },
        },
      },
      group1: {
        baz: 'bas',
        foo: 'bar',
        nest: { key: 'value' },
      },
      group2: {
        abc: 12345,
        deep: { id: 45 },
      },
    };
    expect(result).toEqual(expected);
  });

  test('should parse YAML file correctly', () => {
    const filePath = path.join(__dirname, '../__fixtures__/file1.yml');
    const result = parseFile(filePath);
    const expected = {
      common: {
        setting1: 'Value 1',
        setting2: 200,
        setting3: true,
        setting6: {
          key: 'value',
          doge: { wow: '' },
        },
      },
      group1: {
        baz: 'bas',
        foo: 'bar',
        nest: { key: 'value' },
      },
      group2: {
        abc: 12345,
        deep: { id: 45 },
      },
    };
    expect(result).toEqual(expected);
  });
});
