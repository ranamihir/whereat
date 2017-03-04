module.exports = {
  entry: './static/scripts/index.js',
  output: {
    path: 'static',
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap' // CSS -> Style (Right to Left)
      }
    ]
  }
};
