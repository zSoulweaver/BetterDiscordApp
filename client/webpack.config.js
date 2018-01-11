const
    path = require('path'),
    webpack = require('webpack');

const jsLoader = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
       // presets: ['es2015', 'react']
    }
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'betterdiscord.client.js'
    },
    module: {
        loaders: [jsLoader]
    },
    externals: {
        'electron': 'window.require("electron")'
    }
   /* resolve: {
        alias: {
            'momentjs': 'vendor/moment.min.js'
        },
        modules: [
            path.resolve('./node_modules'),
            path.resolve(__dirname, '..'),
            path.resolve(__dirname, '..', 'node_modules')
        ]
    }*/
};