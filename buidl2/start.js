const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const webpackConfig = require("./webpack.config.js");

function handleCompiler(err, stats) {
  if (err || stats.hasErrors() || stats.hasWarnings()) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

let compiler = webpack(webpackConfig);

let devServer = new WebpackDevServer(compiler, {
  contentBase: "./", //webpack server read file path
  colors: true, //terminal shows log with color
  historyApiFallback: true, //
  inline: true, //
  hot: true,
  progress: true,
  compress: true,
  host: "0.0.0.0",
  disableHostCheck: true,
  port: "3000"
});

devServer.listen(3000, err => {
  if (err) {
    console.log(err);
  }

  console.log("start dev server");
});
