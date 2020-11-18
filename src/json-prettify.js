const beautify = require('json-beautify');

export function doPrettify(data) {
  console.debug(data);
  return beautify(data, null, 2, 120);
}
