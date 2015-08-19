import through from 'through2';
import gutil from 'gulp-util';

export default function (requireConfigPath) {
	if (requireConfigPath === undefined) requireConfigPath = '';

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('explicit-name', 'Streaming not supported'));
			return;
		}

		try {
			var content = file.contents.toString();

			var i = content.indexOf('define(') + 7;
			var newPath = file.path.replace(/\\/g, '/');
			newPath = newPath.replace('.js', '');
			newPath = newPath.replace(/.*modules\//, requireConfigPath);

			content = content.substr(0, i) + '\'' + newPath + '\', ' + content.substr(i);

			file.contents = new Buffer(content);
		} catch (err) {
			this.emit('error', new gutil.PluginError('explicit-name', err, {
				fileName: file.path
			}));
		}

		this.push(file);
		cb();
	});
}
