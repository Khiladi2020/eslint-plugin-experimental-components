const PLUGIN_NAME = 'experimental-components';

const PLUGIN_CONFIG = {
	/** Name of the module from which component import/usage should be checked */
	module_name: 'react-native',
	/** List of experimental components */
	experimental_components: ['Pressable', 'Text'],
	/**
	 * Whether to warn only on imports or warn on usage or both
	 * @type {'import' | 'usage' | 'both'}
	 */
	warn_type: 'both',
	/** Warning message for experimental components */
	warning_message:
		"🔔 Experimental Component 🔔\n'{}' component is experimental, may change, and could contain bugs. Provide feedback for improvements.",
};

module.exports = { PLUGIN_NAME, PLUGIN_CONFIG };
