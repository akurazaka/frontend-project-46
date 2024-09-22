import parseFile from '../src/parsers.js';
import fs from 'fs';
import path from 'path';

describe('parsers', () => {
  test('should parse JSON correctly', () => {
    const filePath = path.join(__dirname, '../__fixtures__/file1.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const result = parseFile('json', data);
    
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

  test('should parse YAML correctly', () => {
    const filePath = path.join(__dirname, '../__fixtures__/file1.yml');
    const data = fs.readFileSync(filePath, 'utf8');
    const result = parseFile('yml', data);
    
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

  test('should throw error for unsupported format', () => {
    const data = '{"key": "value"}';
    expect(() => parseFile('txt', data)).toThrowError(/Cannot find parser for "txt"/);
  });
});
