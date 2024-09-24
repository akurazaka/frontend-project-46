import buildDifferenceTree from '../src/buildDifferenceTree';

describe('buildDifferenceTree', () => {
  test('should return added key', () => {
    const data1 = {};
    const data2 = { key1: 'value1' };

    const expected = [
      { key: 'key1', state: 'added', value: 'value1' },
    ];

    expect(buildDifferenceTree(data1, data2)).toEqual(expected);
  });

  test('should return removed key', () => {
    const data1 = { key1: 'value1' };
    const data2 = {};

    const expected = [
      { key: 'key1', state: 'removed', value: 'value1' },
    ];

    expect(buildDifferenceTree(data1, data2)).toEqual(expected);
  });

  test('should return updated key', () => {
    const data1 = { key1: 'value1' };
    const data2 = { key1: 'newValue1' };

    const expected = [
      {
        key: 'key1',
        state: 'updated',
        oldValue: 'value1',
        newValue: 'newValue1',
      },
    ];

    expect(buildDifferenceTree(data1, data2)).toEqual(expected);
  });

  test('should return unchanged key', () => {
    const data1 = { key1: 'value1' };
    const data2 = { key1: 'value1' };

    const expected = [
      { key: 'key1', state: 'unchanged', value: 'value1' },
    ];

    expect(buildDifferenceTree(data1, data2)).toEqual(expected);
  });

  test('should handle nested objects', () => {
    const data1 = { key1: { nestedKey1: 'value1' } };
    const data2 = { key1: { nestedKey1: 'newValue1' } };

    const expected = [
      {
        key: 'key1',
        state: 'nested',
        value: [
          {
            key: 'nestedKey1',
            state: 'updated',
            oldValue: 'value1',
            newValue: 'newValue1',
          },
        ],
      },
    ];

    expect(buildDifferenceTree(data1, data2)).toEqual(expected);
  });

  test('should handle combination of all states', () => {
    const data1 = {
      key1: 'value1',
      key2: { nestedKey: 'nestedValue' },
      key3: 'unchangedValue',
    };
    const data2 = {
      key2: { nestedKey: 'newNestedValue' },
      key3: 'unchangedValue',
      key4: 'addedValue',
    };

    const expected = [
      { key: 'key1', state: 'removed', value: 'value1' },
      {
        key: 'key2',
        state: 'nested',
        value: [
          {
            key: 'nestedKey',
            state: 'updated',
            oldValue: 'nestedValue',
            newValue: 'newNestedValue',
          },
        ],
      },
      { key: 'key3', state: 'unchanged', value: 'unchangedValue' },
      { key: 'key4', state: 'added', value: 'addedValue' },
    ];

    expect(buildDifferenceTree(data1, data2)).toEqual(expected);
  });
});
