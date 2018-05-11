import baseConfig from './base';

const config = {
  debug: true,
  appEnv: 'dev',
  api: 'http://nao.dev/api/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
