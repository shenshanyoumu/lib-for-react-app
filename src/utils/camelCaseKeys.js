import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import camelCase from 'lodash/camelCase';

export default function camelCaseKeys(object) {
  if (isArray(object)) {
    return object.map(val => camelCaseKeys(val));
  } else if (isObject(object)) {
    const obj = {};
    Object.keys(object).forEach(key => {
      obj[camelCase(key)] = camelCaseKeys(object[key]);
    });
    return obj;
  }
  return object;
}
