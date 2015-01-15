/*global module */
module.exports = function (grunt) {
	"use strict";

	var config;

	/**
	 * @private defineUglifyObject()
	 *
	 * @author Cam Morrow
	 *
	 * @param {boolean} compressed
	 * @param {String} name
	 * @param {String} source_path
	 * @param {String} dest_path
	 * @param {Array} files
	 *
	 * @return {Object}
	 */
	function defineUglifyObject (compressed, name, source_path, dest_path, files) {
		var obj;

		obj = {
			options: {
				sourceMap: true
			},
			src: files.map(function (v) {
				return source_path + v + ".js";
			})
		};

		if (compressed) {
			obj.dest = dest_path + name + "-<%= pkg.version %>.min.js";
		} else {
			obj.dest = dest_path + name + "-<%= pkg.version %>.js";
			obj.options.mangle = false;
			obj.options.compress = false;
			obj.options.preserveComments = "all";
			obj.options.beautify = true;
		}

		return obj;
	}

	/**
	 * @private defineSassObject()
	 *
	 * @author Cam Morrow
	 *
	 * @param {boolean} compressed
	 * @param {String} name
	 * @param {String} source_path
	 * @param {String} dest_path
	 * @param {Array} files
	 *
	 * @return {Object}
	 */
	function defineSassObject (compressed, name, source_path, dest_path, files) {
		var obj;

		obj = {
			options: {
				precision: 10
			},
			src: files.map(function (v) {
				return source_path + v + ".scss";
			})
		};

		if (compressed) {
			obj.options.style = "compressed";
			obj.dest = dest_path + name + "-<%= pkg.version %>.min.css";
		} else {
			obj.options.style = "nested";
			obj.dest = dest_path + name + "-<%= pkg.version %>.css";
		}

		return obj;
	}

	/**
	 * @private addUglifyConfig()
	 *
	 * @author Cam Morrow
	 *
	 * @param {Object} target
	 * @param {String} name
	 * @param {String} source_path
	 * @param {String} dest_path
	 * @param {Array} files
	 */
	function addUglifyConfig (target, name, source_path, dest_path, files) {
		target[name + "-dev"] = defineUglifyObject(false, name, source_path, dest_path, files);
		target[name + "-dist"] = defineUglifyObject(true, name, source_path, dest_path, files);
	}

	/**
	 * @private addSassConfig()
	 *
	 * @author Cam Morrow
	 *
	 * @param {Object} target
	 * @param {string} name
	 * @param {string} source_path
	 * @param {string} dest_path
	 * @param {Array} files
	 */
	function addSassConfig (target, name, source_path, dest_path, files) {
		target[name + "-dev"] = defineSassObject(false, name, source_path, dest_path, files);
		target[name + "-dist"] = defineSassObject(true, name, source_path, dest_path, files);
	}

	/**
	 * @param {string}		name
	 * @param {string}		source_path
	 * @param {string}		dest_path
	 * @param {boolean}		[create_source_map]
	 * @param {boolean}		[create_declaration]
	 */
	function defineTypescriptObject (name, source_path, dest_path, create_source_map, create_declaration) {
		return {
			src: [source_path + "**/*.ts"],
			dest: dest_path + name + "-<%= pkg.version %>.js",
			options: {
				target: "es5",
				sourceMap: !!create_source_map, // Create a .map file
				declaration: !!create_declaration // Create a d.ts file
			}
		};
	}

	/**
	 * @param {Object}		target
	 * @param {string}		name
	 * @param {string}		source_path
	 * @param {string}		dest_path
	 * @param {boolean}		[create_source_map]
	 * @param {boolean}		[create_declaration]
	 */
	function addTypescriptConfig (target, name, source_path, dest_path, create_source_map, create_declaration) {
		target[name] = defineTypescriptObject(name, source_path, dest_path, create_source_map, create_declaration);
	}

	/**
	 * @param {Object}		typescript_target
	 * @param {Object}		uglify_target
	 * @param {string}		name
	 * @param {string}		source_path
	 * @param {string}		dest_path
	 * @param {boolean}		[create_source_map]
	 * @param {boolean}		[create_declaration]
	 */
	function addTypescriptUglifyConfig (typescript_target, uglify_target, name, source_path, dest_path, create_source_map, create_declaration) {
		addTypescriptConfig(typescript_target, name, source_path, dest_path, create_source_map, create_declaration);

		uglify_target[name + "-ts"] = defineUglifyObject(true, name, dest_path, dest_path, [
			name + "-<%= pkg.version %>"
		]);

		grunt.registerTask("typescript-uglify-" + name, ["typescript:" + name, "uglify:" + name + "-ts"]);
	}

	config = {
		pkg: grunt.file.readJSON("package.json"),

		// JS Uglify
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM\") %> */\n"
			}
		},

		// SASS
		sass: {
			options: {
				banner: "/**//*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM\") %> */\n"
			}
		},

		// TypeScript
		typescript: {
		}
	};

	addSassConfig(config.sass, "frontend", "source/scss/frontend/", "cdn/frontend/assets/css/", [
		"frontend"
	]);

	addTypescriptUglifyConfig(config.typescript, config.uglify, "frontend", "source/typescript/", "cdn/frontend/assets/js/", false, false);

	// Project configuration.
	grunt.initConfig(config);

	// Load plugins
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-typescript");
};
