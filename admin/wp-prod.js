//
// Webpack renderer config, set to production mode.
// It might be useful to figure out how to disable the NamedModulesPlugin here. Not sure if it matters.
//

const { merge } = require('webpack-merge');
module.exports = merge(require('./wp'), { mode: 'production' });
