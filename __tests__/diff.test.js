import buildDifferenceTree from '../src/buildDifferenceTree';

describe('buildDifferenceTree', () => {
  test('returns an empty array for two empty objects', () => {
    const data1 = {};
    const data2 = {};
    const result = buildDifferenceTree(data1, data2);
    expect(result).toEqual([]);
  });

  test('detects added properties', () => {
    const data1 = {};
    const data2 = { a: 1 };
    const result = buildDifferenceTree(data1, data2);
    expect(result).toEqual([{ key: 'a', state: 'added', value: 1 }]);
  });

  test('detects removed properties', () => {
    const data1 = { a: 1 };
    const data2 = {};
    const result = buildDifferenceTree(data1, data2);
    expect(result).toEqual([{ key: 'a', state: 'removed', value: 1 }]);
  });

  test('detects unchanged properties', () => {
    const data1 = { a: 1 };
    const data2 = { a: 1 };
    const result = buildDifferenceTree(data1, data2);
    expect(result).toEqual([{ key: 'a', state: 'unchanged', value: 1 }]);
  });

  test('detects updated properties', () => {
    const data1 = { a: 1 };
    const data2 = { a: 2 };
    const result = buildDifferenceTree(data1, data2);
    expect(result).toEqual([{
      key: 'a', state: 'updated', value1: 1, value2: 2,
    }]);
  });

  test('detects nested objects', () => {
    const data1 = { a: { b: 1 } };
    const data2 = { a: { b: 2 } };
    const result = buildDifferenceTree(data1, data2);
    expect(result).toEqual([{
      key: 'a',
      state: 'nested',
      value: [{
        key: 'b', state: 'updated', value1: 1, value2: 2,
      }],
    }]);
  });

  test('handles multiple keys with different states', () => {
    const data1 = { a: 1, b: { c: 3 }, d: 4 };
    const data2 = { a: 1, b: { c: 5 }, e: 6 };
    const result = buildDifferenceTree(data1, data2);
    expect(result).toEqual([
      { key: 'a', state: 'unchanged', value: 1 },
      {
        key: 'b', state: 'nested', value: [
          { key: 'c', state: 'updated', value1: 3, value2: 5 },
        ],
      },
      { key: 'd', state: 'removed', value: 4 },
      { key: 'e', state: 'added', value: 6 },
    ]);
  });
});
