import valid from './validation';

const initialization = function(data, target) {
	for (let key in valid) {
		if (data.hasOwnProperty(key)) {
			target[key] = valid[key](data);
		} else {
			throw new Error('AI ERROR: Missing property : "' + key + '" in passed data object');
		}
	}
};

export default initialization;
