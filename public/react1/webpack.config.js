var path = require('path');
module.exports = {
  entry: path.join(__dirname,'src/index.js'),
  output: {
            path:path.resolve(__dirname, 'dist'),
            filename: "bundle.js"
        },
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.js$/,
         use: 'babel-loader'
     },
     {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            use: 'file-loader?publicPath=./&outputPath=font/'
        }
     ]
   }        
}
 // module: {
 //     loaders: [
 //     { test: /\.css$/, loader: 'css-loader' },
 //     {
 //         test: /\.js$/,
 //         loader: 'babel-loader'
 //     },
 //     {
 //            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
 //            loader: 'file-loader?publicPath=./&outputPath=font/'
 //        }
 //     ]
 // }
