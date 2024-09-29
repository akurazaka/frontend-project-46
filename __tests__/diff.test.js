import buildDifferenceTree from '../src/buildDifferenceTree';

describe('buildDifferenceTree', () => {
  test('должен корректно обрабатывать добавленные и удаленные ключи', () => {
    const data1 = { key1: 'value1', key2: 'value2' };
    const data2 = { key2: 'value2', key3: 'value3' };

    const result = buildDifferenceTree(data1, data2);

    const expected = [
      { key: 'key1', type: 'removed', value: 'value1' },
      { key: 'key2', type: 'unchanged', value: 'value2' },
      { key: 'key3', type: 'added', value: 'value3' },
    ];

    expect(result).toEqual(expected);
  });

  test('должен корректно обрабатывать обновленные значения', () => {
    const data1 = { key1: 'value1' };
    const data2 = { key1: 'newValue1' };

    const result = buildDifferenceTree(data1, data2);

    const expected = [
      {
        key: 'key1', type: 'updated', value1: 'value1', value2: 'newValue1',
      },
    ];

    expect(result).toEqual(expected);
  });

  test('должен корректно обрабатывать вложенные объекты', () => {
    const data1 = { key1: { nestedKey: 'value1' } };
    const data2 = { key1: { nestedKey: 'value2' } };

    const result = buildDifferenceTree(data1, data2);

    const expected = [
      {
        key: 'key1',
        type: 'nested',
        value: [
          {
            key: 'nestedKey', type: 'updated', value1: 'value1', value2: 'value2',
          },
        ],
      },
    ];

    expect(result).toEqual(expected);
  });

  test('должен корректно обрабатывать неизменённые значения', () => {
    const data1 = { key1: 'value1' };
    const data2 = { key1: 'value1' };

    const result = buildDifferenceTree(data1, data2);

    const expected = [
      { key: 'key1', type: 'unchanged', value: 'value1' },
    ];

    expect(result).toEqual(expected);
  });

  test('должен корректно обрабатывать пустые объекты', () => {
    const data1 = {};
    const data2 = {};

    const result = buildDifferenceTree(data1, data2);

    expect(result).toEqual([]);
  });

  test('должен корректно обрабатывать ситуации, когда один из объектов пуст', () => {
    const data1 = { key1: 'value1' };
    const data2 = {};

    const result = buildDifferenceTree(data1, data2);

    const expected = [
      { key: 'key1', type: 'removed', value: 'value1' },
    ];

    expect(result).toEqual(expected);
  });
});
