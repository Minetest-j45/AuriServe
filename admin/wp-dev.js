//
// Set up the hot loader for the electron renderer thread.
// This will also start the main process as a precursor to the devServer initialization.
//

const { merge } = require('webpack-merge');
const spawn = require('child_process').spawn;

const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = merge(require('./wp'), {
	// resolve: { alias: { 'react-dom': '@hot-loader/react-dom' } },

	watch: true,

	plugins: [
		new LiveReloadPlugin()
	]
	// devServer: {
	// 	port: 3000,
	// 	compress: true,
	// 	// noInfo: true,
	// 	stats: 'errors-only',
	// 	inline: true,
	// 	hot: true,
	// 	headers: { 'Access-Control-Allow-Origin': '*' },
	// 	historyApiFallback: {
	// 		verbose: true,
	// 		disableDotRule: false
	// 	},

	// 	// before() {
	// 		// console.log('Starting Hot Reloading');
	// 		// spawn('npm', ['run', 'start-main-dev'], {
	// 		// 	shell: true,
	// 		// 	env: process.env,
	// 		// 	stdio: 'inherit'
	// 		// })
	// 		// .on('close', code => process.exit(code))
	// 		// .on('error', spawnError => console.error(spawnError));
	// 	// }
	// }
});
