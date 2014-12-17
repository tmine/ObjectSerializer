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
                var function_body = value.replace(" ", "").replace("function()", "");
                return new Function(function_body);
            }
            return value;
        });
    };
    return ObjectSerializer;
})();
