export function esm(js: string) {
  return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(js);
}
