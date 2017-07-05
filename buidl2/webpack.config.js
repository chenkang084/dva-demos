var webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  autoprefixer = require("autoprefixer"),
  caseSensitivePathsWebpackPlugin = require("case-sensitive-paths-webpack-plugin"),
  // ngAnnotatePlugin = require('ng-annotate-webpack-plugin'),
  // CopyWebpackPlugin = require('copy-webpack-plugin'),
  _ = require("lodash"),
  path = require("path"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  env = _.trim(process.env.NODE_ENV);

console.log(
  "=============================" + env + "============================="
);
console.log(
  "=============================" + __dirname + "============================="
);

let rootPath = path.resolve(__dirname, "../");

var webpackConfig = {
  devtool: "cheap-module-source-map", //generate source map for developing
  entry: {
    app: path.join(rootPath, "src/index.js") //the main file for start app
    // vendor: []
  },

  output: {
    // publicPath: __dirname + "/public",
    path: rootPath + "/dist", //the path saving packed file
    // filename: "bundle[hash].js" //the out put file name
    filename: "bundle.js"
  },
  // devServer: {
  //     contentBase: "./", //webpack server read file path
  //     colors: true, //terminal shows log with color
  //     historyApiFallback: true, //
  //     inline: true, //
  //     hot: true,
  //     port:8888,
  //     progress: true,
  //     compress: true
  // },
  resolve: {
    extensions: [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".js",
      ".json",
      ".jsx",
      ".ts",
      "tsx",
      ""
    ],
    alias: {}
  },
  resolveLoader: {
    root: ["node_modules"],
    moduleTemplates: ["*-loader"]
  },
  module: {
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(css|less)$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: "url",
        query: {
          limit: 10000,
          name: "static/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(js|jsx)$/,
        // include: "../src/",
        loader: "babel"
      },
      //   {
      //     test: /\.css$/,
      //     // include: "../src/",
      //     loader:
      //       "style!css?importLoaders=1&modules!postcss"
      //   },
      //   {
      //     test: /\.less$/,
      //     // include: "../src/",
      //     loader:
      //       'style!css?importLoaders=1&modules!postcss!less?{"modifyVars":{}}'
      //   },
      {
        test: /\.css$/,
        // include: paths.appNodeModules,
        loader: "style!css"
      },
      {
        test: /\.less$/,
        // include: paths.appNodeModules,
        loader: 'style!css?importLoaders=1!postcss!less?{"modifyVars":{}}'
      },
      // {
      //   test: /\.html$/,
      //   loader: "file?name=[name].[ext]"
      // },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.svg$/,
        loader: "file",
        query: {
          name: "static/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  babel: {
    babelrc: false,
    presets: [
      require.resolve("babel-preset-es2015"),
      require.resolve("babel-preset-react"),
      require.resolve("babel-preset-stage-0")
    ],
    plugins: [
      require.resolve("babel-plugin-add-module-exports"),
      require.resolve("babel-plugin-react-require")
    ],
    // .concat(config.extraBabelPlugins || []),
    cacheDirectory: true
  },
  postcss: function postcss() {
    return [
      {
        browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
      }
    ];
    // .concat(config.extraPostCSSPlugins ? config.extraPostCSSPlugins : []);
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "/../public/index.html") //packed js append to index.html,set index.html path
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new caseSensitivePathsWebpackPlugin()
  ]
};

module.exports = webpackConfig;
