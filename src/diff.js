const diff = (obj1, obj2) => {
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    const result = [];
  
    keys.forEach((key) => {
      if (!Object.hasOwn(obj2, key)) {
        result.push({ key, type: 'removed', value: obj1[key] });
      } else if (!Object.hasOwn(obj1, key)) {
        result.push({ key, type: 'added', value: obj2[key] });
      } else if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        result.push({ key, type: 'nested', children: diff(obj1[key], obj2[key]) });
      } else if (obj1[key] !== obj2[key]) {
        result.push({ key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] });
      } else {
        result.push({ key, type: 'unchanged', value: obj1[key] });
      }
    });
  
    return result;
  };
  
export default diff;
  