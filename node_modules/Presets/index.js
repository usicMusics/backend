'use strict';

module.exports.effect = function(name) {
	var path = name.replace(':', '/');
	return require('./effect/' +path + '.json' );
}

module.exports.instrument = function(name) {
	var path = name.replace(':', '/');
	return require('./instrument/' + path + '.json' );
}