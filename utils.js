const { PLUGIN_NAME } = require('./constants');

/**
 * Function to replace {} with component name in warning messages
 * @param {string} message
 * @param {string} componentName
 */
const updateMessageWithComponentName = (message, componentName) => {
	return message.replace('{}', componentName ?? '');
};

const isValidKey = (obj, key, keyType) => {
	if (keyType === 'array') {
		if (!(key in obj) || Array.isArray(obj[key]) !== true) {
			return false;
		}
	} else if (!(key in obj) || typeof obj[key] !== keyType) {
		return false;
	}
	return true;
};

const showKeyError = (key, keyType) => {
	console.error(
		`${PLUGIN_NAME}: ${key} in paths object is either not present or have invalid type. Expected type is ${keyType}`,
	);
};

const validateInputOptions = CONFIG_OPTIONS => {
	if (CONFIG_OPTIONS.length == 0) {
		console.log(`${PLUGIN_NAME} no config options provided in eslint config file`);
	}
	const options = CONFIG_OPTIONS[0];
	const paths = options?.paths ?? [];

	paths.forEach(path => {
		!isValidKey(path, 'module_name', 'string') && showKeyError('module_name', 'string');
		!isValidKey(path, 'experimental_components', 'array') && showKeyError('experimental_components', 'array');
		!isValidKey(path, 'warn_type', 'string') && showKeyError('warn_type', 'string');
		!isValidKey(path, 'warning_message', 'string') && showKeyError('warning_message', 'string');
	});
};

const getSanitizedConfig = paths => {
	const config = [];

	paths.forEach(path => {
		if (
			isValidKey(path, 'module_name', 'string') &&
			isValidKey(path, 'experimental_components', 'array') &&
			isValidKey(path, 'warn_type', 'string') &&
			isValidKey(path, 'warning_message', 'string')
		) {
			config.push(path);
		}
	});

	return config;
};

module.exports = {
	updateMessageWithComponentName,
	isValidKey,
	showKeyError,
	validateInputOptions,
	getSanitizedConfig,
};
