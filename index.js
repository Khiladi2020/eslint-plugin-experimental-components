// eslint-plugin-experimental-components.js

const { updateMessageWithComponentName, validateInputOptions, getSanitizedConfig } = require('./utils');

module.exports = {
	rules: {
		'warn-on-experimental-component-usage': {
			meta: {
				type: 'suggestion',
				docs: {
					description: 'Show warnings for experimental components or functions',
				},
			},
			create(context) {
				// Show errors for invalid configuration
				validateInputOptions(context.options);

				const CONFIG_OPTIONS = context.options[0]?.paths;
				const SANITIZED_CONFIG_OPTIONS = getSanitizedConfig(CONFIG_OPTIONS);

				return {
					ImportDeclaration(node) {
						const moduleName = node.source.value;

						// Check if module exists in config provided
						const module_config = SANITIZED_CONFIG_OPTIONS.filter(
							module => module.module_name === moduleName,
						)[0];

						if (module_config) {
							// console.log("variables", context.getDeclaredVariables(node))
							const variables = context.getDeclaredVariables(node) ?? [];

							variables.forEach(item => {
								const importName = item?.name ?? '';
								if (module_config.experimental_components.includes(importName)) {
									if (module_config.warn_type === 'import' || module_config.warn_type === 'both') {
										item.identifiers.forEach(identifier => {
											context.report({
												loc: identifier.loc,
												message: updateMessageWithComponentName(
													module_config.warning_message,
													importName,
												),
											});
										});
									}
									if (module_config.warn_type === 'usage' || module_config.warn_type === 'both') {
										item.references.forEach(ref => {
											context.report({
												loc: ref.identifier.loc,
												message: updateMessageWithComponentName(
													module_config.warning_message,
													importName,
												),
											});
										});
									}
								}
							});
						}
					},
				};
			},
		},
	},
};
