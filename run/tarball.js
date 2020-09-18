const FileSystem = require('fs-extra');
const TarGz = require('targz');

const OUTPUT = 'dist';
const TEMPORARY = 'tmp';

var name = 'unknown';
if (process.argv.indexOf('--name') != -1) {
	name = process.argv[process.argv.indexOf('--name') + 1];
}

var version = 'unknown';
if (process.argv.indexOf('--version') != -1) {
	version = process.argv[process.argv.indexOf('--version') + 1];
}

var folder = TEMPORARY + '/' + name;
var file = name + '-' + version + '.tgz';

function usefulFiles(source, target) {
	if (source.indexOf('.js.map') > -1) return false;
	return true; // useful file
}

FileSystem.removeSync(file);

FileSystem.ensureDir(folder, function (error) {
	if (error) return console.error(error);

	FileSystem.copySync(
		OUTPUT,
		folder,
		{
			filter: usefulFiles
		},
		function (error) {
			if (error) return console.error(error);
		}
	);

	TarGz.compress(
		{
			src: TEMPORARY,
			dest: file
		},
		function (error) {
			if (error) return console.error(error);
			else {
				FileSystem.remove(TEMPORARY, function (error) {
					if (error) return console.error(error);
				});
			}
		}
	);
});
