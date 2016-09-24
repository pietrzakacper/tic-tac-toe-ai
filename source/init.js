var AI = (function(module) {
	var valid = module.Validation;

	module.initialization = function(data, target) {
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				if (!(target[key] = valid[key](data))) {
					console.log('AI: Initialization aborted: ' + key + ' initialization error!');
					return false;
				}
			} else {
				console.log('AI ERROR: Missing property : "' + key + '" in passed data object');
			}
		}
		return true;
	};

	return module;
})(AI || {});
