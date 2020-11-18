const _ = require('lodash');
const stringify = require('json-stable-stringify');

let sort_obj = function (a, b) {
  if (a.key == b.key) {
    return a.value < b.value ? -1 : 1;
  }
  return a.key < b.key ? -1 : 1;
};

let sort_arr = function (a, b) {
  // TODO 支持通用数组
  if (a.command != b.command) {
    return a.command < b.command ? -1 : 1;
  }
  if (a.key != b.key) {
    return a.key < b.key ? -1 : 1;
  }
  if (a.when && b.when) {
    return a.when < b.when ? -1 : 1;
  }
  if (a.when) {
    return 1;
  }
  return -1;
};

// TODO 排序规则可变

export function doSort(data) {
  console.debug(data);
  let json = JSON.parse(data);
  let sorted_str = stringify(json, sort_obj);
  let sorted_json = JSON.parse(sorted_str);
  if (_.isArray(sorted_json)) {
    sorted_json = sorted_json.sort(sort_arr);
  }
  return JSON.stringify(sorted_json);
}
