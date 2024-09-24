import plain from '../src/formatters/plain.js';

describe('plain formatter', () => {
  test('should format added property', () => {
    const diffTree = [
      {
        key: 'host',
        state: 'added',
        value: 'hexlet.io',
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe("Property 'host' was added with value: 'hexlet.io'");
  });

  test('should format updated property', () => {
    const diffTree = [
      {
        key: 'timeout',
        state: 'updated',
        oldValue: 50,
        newValue: 20,
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe("Property 'timeout' was updated. From 50 to 20");
  });

  test('should format removed property', () => {
    const diffTree = [
      {
        key: 'timeout',
        state: 'removed',
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe("Property 'timeout' was removed");
  });

  test('should handle nested properties', () => {
    const diffTree = [
      {
        key: 'common',
        state: 'nested',
        value: [
          {
            key: 'setting1',
            state: 'removed',
          },
          {
            key: 'setting2',
            state: 'added',
            value: 'value2',
          },
        ],
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe(
      "Property 'common.setting1' was removed\nProperty 'common.setting2' was added with value: 'value2'"
    );
  });

  test('should return empty string for unchanged properties', () => {
    const diffTree = [
      {
        key: 'verbose',
        state: 'unchanged',
        value: true,
      },
    ];
    const result = plain(diffTree);
    expect(result).toBe('');
  });

  test('should throw error for invalid state', () => {
    const diffTree = [
      {
        key: 'invalid',
        state: 'invalidState',
      },
    ];
    expect(() => {
      plain(diffTree);
    }).toThrowError('Invalid node state - invalidState');
  });
});
