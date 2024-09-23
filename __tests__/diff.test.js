import buildDifferenceTree from '../src/buildDifferenceTree.js';

describe('buildDifferenceTree', () => {
  test('should find differences between two flat JSON objects', () => {
    const obj1 = { key1: 'value1', key2: 'value2' };
    const obj2 = { key2: 'newValue2', key3: 'value3' };
    const result = buildDifferenceTree(obj1, obj2);
    const expected = [
      { key: 'key1', type: 'removed', value: 'value1' },
      { key: 'key2', type: 'changed', oldValue: 'value2', newValue: 'newValue2' },
      { key: 'key3', type: 'added', value: 'value3' },
    ];
    expect(result).toEqual(expected);
  });
});
