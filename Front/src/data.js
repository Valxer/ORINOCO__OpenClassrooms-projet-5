import DataFetcher from './js/dataFetcher';

/**
 * extract the value id from the string given
 * @param {String} strToParse the string to parse
 * 
 * @return  {String}          the parsed string   
 */
 export function extractId(strToParse) {
	let result;
	let isItId = false;
	for (let i = 0; i < strToParse.length; i++) {
	  if (isItId){
		result = strToParse.slice(i);
		i = strToParse.length;
	  }
	  else if (strToParse[i] == "=")
		isItId = true;
		
	}
	return result;
  }

const data = { DataFetcher: new DataFetcher("http://localhost:3000/api/teddies/") };

export default data;