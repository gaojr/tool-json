const fs = require('fs');
const _ = require('lodash');
const { doMinify } = require('./json-minify');
const { doPrettify } = require('./json-prettify');
const { doSort } = require('./json-sort');

function isJSON(str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e);
    }
  }
  return false;
}

function read(file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data.toString();
  });
}

function write(file, data) {
  fs.writeFile(file, data, function (error) {
    if (error) {
      return console.error(error);
    }
  });
}

function action(files, func) {
  if (_.isEmpty(files)) {
    return;
  }
  files.forEach((file) => {
    let str = read(file);
    write(file, func(str));
  });
}

export function minify(files) {
  action(files, doMinify);
}

export function prettify(files) {
  action(files, doPrettify);
}

export function sort(files) {
  action(files, doSort);
}
