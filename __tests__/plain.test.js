import plain from '../src/formatters/plain.js';

describe('Plain formatter', () => {
  test('should format added property', () => {
    const diff = [{ key: 'common.follow', action: 'added', value: false }];
    expect(plain(diff)).toBe("Property 'common.follow' was added with value: false");
  });

  test('should format removed property', () => {
    const diff = [{ key: 'common.setting2', action: 'removed' }];
    expect(plain(diff)).toBe("Property 'common.setting2' was removed");
  });

  test('should format updated property', () => {
    const diff = [{ key: 'common.setting3', action: 'updated', value: { old: true, new: null } }];
    expect(plain(diff)).toBe("Property 'common.setting3' was updated. From true to null");
  });

});
