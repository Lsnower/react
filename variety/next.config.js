const webpack = require('webpack')
module.exports = {
    // webpack: (config, context) => {
    //     config.module.rules.push({
    //         test: /\.css$/,
    //         loader: 'css-loader'
    //     });
    //     return config;
    // }
    webpack:(config, {dev}) =>{
        config.plugins.push(
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'zp': 'zepto'
            })
        )
        return config;
    }
}
