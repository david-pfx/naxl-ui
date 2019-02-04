// Evolutility-UI-React :: utils/url.js

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2018 Olivier Giulieri

const queryString = require('query-string');

export default {

	querySearch(query){
		// - make uri params string from query object
		// - example: {a:1, b: 'bbb'} => "a=1&b=bbb"
		var urlParams = []
		for(var prop in query) {
			if(query[prop]!==''){
				urlParams.push(prop+'='+encodeURI(query[prop]))
			}
		}
		return urlParams.join('&');
	},

	parseQuery(qString){
		if(qString){
			const idx = qString.indexOf('?')
			return qString ? queryString.parse(idx ? qString.slice(idx) : qString) : null
		}
		return null
	},

}