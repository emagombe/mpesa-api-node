require("@babel/register")({
	presets: ["@babel/preset-env"],
	plugins: [
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-transform-runtime"
	]
});

require("./src/index.js");