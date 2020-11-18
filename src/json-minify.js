export function doMinify(data) {
  console.debug(data);
  return JSON.stringify(JSON.parse(JSON.minify(data)));
}
