const FileSystem = require('fs-extra');
const ParseString = require('xml2js').parseString;
const xml2js = require('xml2js');

// const configFile = './config.xml';
const indexFile = 'src/index.html';
const loginFile = 'src/app/inicio.component.ts';
const packageFile = './package.json';
const packageLockFile = 'package-lock.json';
const versionFile = 'src/assets/version';

var version = null;

if (process.argv.indexOf('--version') != -1) {
	version = process.argv[process.argv.indexOf('--version') + 1];
}

if (version == null) {
	console.error(`Version is required.`);
	process.exit(1);
}

FileSystem.readJson(packageFile, function (error, object) {
	if (error) return console.error(error);
	object.version = version;
	FileSystem.writeFile(packageFile, JSON.stringify(object, null, 2), function (error) {
		if (error) return console.error(error);
	});
});

FileSystem.readJson(packageLockFile, function (error, object) {
	if (error) return console.error(error);
	object.version = version;
	FileSystem.writeFile(packageLockFile, JSON.stringify(object, null, 2), function (error) {
		if (error) return console.error(error);
	});
});

FileSystem.readFile(loginFile, 'utf8', function (error, data) {
	if (error) return console.error(error);
	var result = data.replace(/Versão\s(\d+)\.(\d+)\.(\d+)/g, 'Versão ' + version);
	FileSystem.writeFile(loginFile, result, 'utf8', function (error) {
		if (error) return console.error(error);
	});
});

// FileSystem.readFile(configFile, 'utf-8', function (err, data) {
// 	if (err) console.log(err);
// 	ParseString(data, function (err, object) {
// 		if (err) console.log(err);
// 		var versionCode = version.replace(/\./g, '');
// 		object['widget']['$']['version'] = version;
// 		object['widget']['$']['android-versionCode'] = versionCode;
// 		object['widget']['platform'][1]['custom-config-file'][0]['string'][0] = versionCode;
// 		var renderOpts = { pretty: true, indent: '    ', newline: '\n' };
// 		var xmldec = { version: '1.0', encoding: 'utf-8' };
// 		var builder = new xml2js.Builder({ renderOpts: renderOpts, xmldec: xmldec });
// 		var xml = builder.buildObject(object);
// 		FileSystem.writeFile(configFile, xml, function (err, data) {
// 			if (err) console.log(err);
// 		});
// 	});
// });

FileSystem.readFile(indexFile, 'utf8', function (error, data) {
	if (error) return console.error(error);
	var versionProperty = "client = '" + version + "'";
	var result = data.replace(/client\s*\=+(\s*)+('|")(.)*?('|")/g, versionProperty);
	FileSystem.writeFile(indexFile, result, 'utf8', function (error) {
		if (error) return console.error(error);
	});
});

FileSystem.readFile(versionFile, 'utf8', function (error, data) {
	if (error) return console.error(error);
	var result = version;
	FileSystem.writeFile(versionFile, result, 'utf8', function (error) {
		if (error) return console.error(error);
	});
});
