import plain from '../src/formatters/plain.js';

describe('plain formatter', () => {
  test('should format added property', () => {
    const diffTree = [
      {
        key: 'host',
        type: 'added',
        value: 'hexlet.io',
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe('Property \'host\' was added with value: \'hexlet.io\'');
  });

  test('should format updated property', () => {
    const diffTree = [
      {
        key: 'timeout',
        type: 'updated',
        value1: 50,
        value2: 20,
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe('Property \'timeout\' was updated. From 50 to 20');
  });

  test('should format removed property', () => {
    const diffTree = [
      {
        key: 'timeout',
        type: 'removed',
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe('Property \'timeout\' was removed');
  });

  test('should handle nested properties', () => {
    const diffTree = [
      {
        key: 'common',
        type: 'nested',
        value: [
          {
            key: 'setting1',
            type: 'removed',
          },
          {
            key: 'setting2',
            type: 'added',
            value: 'value2',
          },
        ],
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe(
      'Property \'common.setting1\' was removed\nProperty \'common.setting2\' was added with value: \'value2\'',
    );
  });

  test('should return empty string for unchanged properties', () => {
    const diffTree = [
      {
        key: 'verbose',
        type: 'unchanged',
        value: true,
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe('');
  });

  test('should throw error for invalid type', () => {
    const diffTree = [
      {
        key: 'invalid',
        type: 'invalidType',
      },
    ];
    expect(() => {
      plain(diffTree);
    }).toThrow('Invalid node type - invalidType');
  });
});
