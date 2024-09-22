import jsonFormatter from '../src/formatters/json.js';

test('JSON formatter', () => {
  const diff = [
    { key: 'common.follow', value: false, status: 'added' },
    { key: 'common.setting2', status: 'removed' },
  ];
  const expected = JSON.stringify(diff, null, 2);
  
  expect(jsonFormatter(diff)).toEqual(expected);
});