var ObjectSerializer = (function () {
    function ObjectSerializer() {
    }
    ObjectSerializer.serialize = function (obj, flatten) {
        if(flatten && (typeof obj === "object" || typeof obj === "function")) {
            obj = Object.create(obj);
            for(var key in obj) obj[key] = obj[key];
        }
        return JSON.stringify(obj, function (key, value) {
            if (typeof value === "function") return value.toString();
            return value;
        });
    };
    ObjectSerializer.deserialize = function (str) {
        return JSON.parse(str, function (key, value) {
            if (typeof value === "string" && value.indexOf("function") == 0) {
                var function_name = value.substring(value.indexOf(" ")+1, value.indexOf("("));
                value = value.replace(" ", "");
                var args = value.substring(value.indexOf("(")+1, value.indexOf(")")).split(",");
                args.push(value.replace("function"+function_name+"("+args+")", ""));
                return Function.apply(null, args);
            }
            return value;
        });
    };
    return ObjectSerializer;
})();