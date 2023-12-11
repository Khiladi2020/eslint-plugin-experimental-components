# eslint-plugin-experimental-components

The plugin flags components/functions as experimental, issuing warnings in the code editor upon import or usage. This ensures developers are aware of the component's potential instability and the likelihood of future changes.

## Installation

You will first need to install eslint package

```bash
npm i eslint --save-dev
```

Next, install `eslint-plugin-experimental-components`:

```bash
npm i eslint-plugin-experimental-components --save-dev
```

## Usage

Add `experimental-components` to the plugins section of your `.eslintrc` configuration file

```jsonc
{
    "plugins": ["experimental-components"]
}
```

Then add the rules under the rules section

```jsonc
{
    "rules": {
        "experimental-components/warn-on-experimental-component-usage": [
			"warn",
			{
				"paths": [
					{
						"module_name": "ui/components",
						"experimental_components": ["RadioButton", "AppBar"],
						"warn_type": "both",
						"warning_message":
							"🔔 Experimental Component 🔔\n'{}' component is experimental component.",
					},
                    ....
				],
			},
		],
    }
}
```
