var valid = require('./validation.js');

exports.initialization = function(data, target) {
	for (var key in valid) {
		if (data.hasOwnProperty(key)) {
			target[key] = valid[key](data);
		} else {
			throw new Error('AI ERROR: Missing property : "' + key + '" in passed data object');
		}
	}
};
