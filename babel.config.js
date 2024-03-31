module.exports = {
  presets: [
    ['@babel/preset-env'],
  ],
  // 서버는 webpack을 통과하지 않으므로 서버까지 지원하기 위해서 babel의 resolver를 사용했습니다.
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          Config:
            {
              local: './src/config-local.js',
              development: './src/config-dev.js',
            }[process.env.NODE_ENV] || './src/config.js',
        },
      },
    ],
  ],
};
