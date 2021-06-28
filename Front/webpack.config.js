const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin= require("mini-css-extract-plugin");

let htmlPageNames = ['item', 'order', 'validation'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`main`] // respective JS files
  })
});

module.exports = {
  //mode: 'development',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
	  {
		test: /\.scss$/,
		use: [
			"style-loader",
			"css-loader",
			"sass-loader"
		]
	  },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ['main']
    }),
	new MiniCssExtractPlugin({
		filename: "[name].css",
		chunkFilename:"[id].css"
	})
  ].concat(multipleHtmlPlugins)
};
