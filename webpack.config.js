const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    handlemobility: './src/public/mth/handlemobility.js',
  },
  // target: webpack이 추가하는 코드들의 ES문법 target은 이 설정으로 제어해주어야 합니다.
  target: 'es3',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    // chunkFormat: target이 es3인 경우 지정해줘야 한다고 메세지가 떠서 지정했습니다.
    chunkFormat: 'array-push',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // corejs: 이 설정은 문법 쪽이 아닌 polyfill 을 담당합니다. 위의 exclude로 node_modules를
              // 제외했으므로 아래 core-js가 사용여부를 분석해 polyfill해 주는 영역은 오로지 현재 프로젝트의 소스코드만
              // 해당합니다. 아래 설정 없이 수동으로 직접 시작 지점(main.js)에서 polyfill 해줄 수 있습니다. react의 경우
              // babel을 통과하지 않도록 exclude 설정이 되어있기 때문에 시작 지점(main.js)에서 react에서 사용하는
              // 기능들을 polyfill 합니다.
              ['@babel/preset-env', { targets: { ie: 9 }, useBuiltIns: 'usage', corejs: '3.22.5' }],
            ],
          },
        },
      },
    ],
  },
  // devtool: source-map이 같이 나가더라도 외부에서 실제 소스(src/*.js)에 접근이 안되면 외부에서는 소스맵이 있더라도
  // 소스를 볼수 없으므로 dev/prod 관계 없이 생성하도록 설정했습니다.
  devtool: 'source-map',
  // extensions: `import App from './App';`처럼 뒤에 .jsx 확장자를 붙이지 않고도 import할 수 있도록 jsx 확장자도
  // 추가해줍니다.
  // resolve: { extensions: ['.js', '.jsx'] },
};
