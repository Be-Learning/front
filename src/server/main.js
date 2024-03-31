import dnscache from 'dnscache';
import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyStatic from 'fastify-static';
import 'make-promises-safe';
import path from 'path';
import webpackConfig from '../../webpack.config';
import urls from '../urls';
import regular from './mth';

const init = () => {
  const app = fastify({ logger: true });

  if (process.env.NODE_ENV === 'local') {
    import('webpack').then(async ({ default: webpack }) => {
      const compiler = webpack({
        ...webpackConfig,
        entry: Object.fromEntries(
                Object.entries(webpackConfig.entry).map(([key, value]) => [key, ['fastify-webpack-hot/client', value]])
        ),
        output: {
          ...webpackConfig.output,
          publicPath: '/e/',
        },
        plugins: [new webpack.HotModuleReplacementPlugin()],
      });
      const { fastifyWebpackHot } = await import('fastify-webpack-hot');
      app.register(fastifyWebpackHot, { compiler });
    });
  } else {
    app.register(fastifyStatic, {
      root: path.join(process.cwd(), 'public'),
      decorateReply: false,
      prefix: '/e/',
    });
  }

  app.register(fastifyCookie);

  app.register(require('point-of-view'), {
    root: path.join(process.cwd(), 'templates'),
    engine: { ejs: require('ejs') },
    defaultContext: {},
  });

  app.addHook('onRequest', async (request) => {
    request.userInfo = decryptUser(
            { dev: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local', site: 'KR', now: new Date() },
            request.cookies
    );
  });

  app.register(regular, { prefix: '/e/mth' });
  return app;
};

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

if (require.main === module) {
  const host = process.env.HOST || 'localhost';
  const port = normalizePort(process.env.PORT || '8080');

  // fusion 내 DNS가 불안정한 이슈로 인해 캐시를 사용함.
  dnscache({ enable: true, ttl: 86400, cachesize: 10000 });

  const app = init();

  app.listen(port, host, (error) => {
    if (error) {
      if (error.syscall !== 'listen') throw error;
      const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
      if (error.code === 'EACCESS') {
        app.log.error(`${bind} requires elevated privileges`);
        process.exit(1);
      } else if (error.code === 'EADDRINUSE') {
        app.log.error(`${bind} is already in use`);
        process.exit(1);
      } else {
        throw error;
      }
    }
  });
} else {
  module.exports = init;
}
