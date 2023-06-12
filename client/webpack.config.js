const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //"Create a new HTML plugin"
      // HtmlWebpackPlugin= generates our html file and injects our bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      //"Inject Manifest plugin"
      //InjectManifest= injects our custom servie worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      //"PWA Manifest plugin"
      //WebpackPwaManifest= creates a manifest.json file.
      //a configuration file that provides information about the app in a JSON text file and helps devices understand and adapt to various device configurations and platforms
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            //This is an array of pixel sizes. This tells the plugin to resize the icon to these dimensions so will have the same icon but in different sizes. Ensures that icon looks good on screens of different resolutions.
            sizes: [96, 128, 192, 256, 384, 512],
            //tells the plugin where to output the resized icon images. 
            //path.join is another function in Node.js that joins the given path segments. 
              //In this case, it joins 'assets' and 'icons' to form 'assets/icons'. So resized icon images will be put into an 'assets/icons' directory in the output directory of the webpack build.
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
        
        rules: [
          //Rule 1
          // CSS Loaders
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },

          //Rule 2
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            // Use babel-loader in order to use ES6.
            use: {

              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              },

            },
          },

        ]    
    },

  };
};
