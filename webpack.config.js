const path = require('path');
module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devtool:'source-map'

}