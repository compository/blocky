import plugins from '../web-dev.plugins.mjs';

export default {
  port: 8081,
  watch: true,
  nodeResolve: {
    browser: true,
  },
  rootDir: '../../',
  appIndex: 'lib/demo/index.html',
  open: true,
  plugins,
};
