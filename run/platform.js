const FileSystem = require('fs-extra');
const file = 'src/environments/environment.ts';
const platforms = ['android', 'browser', 'ios'];

var platform = '';
if (process.argv.indexOf('--platform') != -1) {
	platform = process.argv[process.argv.indexOf('--platform') + 1];
}

if (!platforms.includes(platform)) {
	console.error(`Unknow platform, please use: ${platforms.join(', ')}.`);
	process.exit(1);
}

var platformProperty = "platform: '" + platform + "'";
FileSystem.readFile(file, 'utf8', function (error, data) {
	if (error) return console.error(error);
	var result = data.replace(/platform\:+(\s*)+('|")(.)*?('|")/g, platformProperty);
	FileSystem.writeFile(file, result, 'utf8', function (error) {
		if (error) return console.error(error);
	});
});
