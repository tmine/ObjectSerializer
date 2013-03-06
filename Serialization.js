function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function isObject(objToCheck) {
	var getType = {};
	return objToCheck && getType.toString.call(objToCheck) === '[object Object]';
}

function getSourceOfObject(obj){
	var string = "";
	string += "(function(){ var obj = " + obj.constructor + "\n";
	for(var c in obj){
		if(isFunction(obj[c])){
			string += "obj." + c + " = " + obj[c] + ";\n";
		} else if(isObject(obj[c])){
			string += "obj." + c + " = " + getSourceOfObject(obj[c]) + ";\n";
		} else {
			string += "obj." + c + " = " + obj[c] + ";\n";
		}
	}
	string += "return obj;})();";
	return string;
}