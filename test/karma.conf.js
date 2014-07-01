// Karma configuration
module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '..',
		frameworks: ['jasmine'],
		// list of files / patterns to load in the browser
		files: [
			'html2dom.js',
			'test/*.spec.js'
		],
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,
		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome']
	});
};