var ObjectSerializer = (function () {
    function ObjectSerializer() {
    }
    ObjectSerializer.serialize = function (obj) {
        return JSON.stringify(obj, function (key, value) {
            if (typeof value === "function")
                return value.toString();
            return value;
        });
    };
    ObjectSerializer.deserialize = function (str) {
        return JSON.parse(str, function (key, value) {
            if (typeof value === "string" && value.indexOf("function") == 0) {
                var function_name = value.substring(value.indexOf(" ")+1, value.indexOf("("));
                value = value.replace(" ", "");
                var arguments = value.substring(value.indexOf("(")+1, value.indexOf(")")).split(",");
                var function_body = value.replace("function"+function_name+"("+arguments+")", "");
                arguments.push(function_body);
                return Function.apply(null, arguments);
            }
            return value;
        });
    };
    return ObjectSerializer;
})();
