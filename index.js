var ObjectSerializer = (function () {
    function ObjectSerializer() {
    }
    ObjectSerializer.serialize = function (obj, flatten) {
        if(flatten && (typeof obj === "object" || typeof obj === "function")) {
            obj = Object.create(obj);
            for(var key in obj) obj[key] = obj[key];
        }
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
                var args = value.substring(value.indexOf("(")+1, value.indexOf(")")).split(",");
                args.push(value.replace("function"+function_name+"("+args+")", ""));
                return Function.apply(null, args);
            }
            return value;
        });
    };
    return ObjectSerializer;
})();

// Test Classes
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
var MyGreeter = (function (_super) {
    __extends(MyGreeter, _super);
    function MyGreeter() {
        _super.apply(this, arguments);
    }
    MyGreeter.prototype.greet = function () {
        return "Hi, " + this.greeting;
    };
    return MyGreeter;
})(Greeter);
// end Test Classes

// TestCases
var testString = "Hello World";
var tests = [
    {   name: "Number", flatten: false, obj: 1,
        test: function(obj){
            return obj === 1;
        }
    },
    {   name: "String", flatten: false, obj: testString,
        test: function(obj){
            return obj === testString;
        }
    },
    {
        name: "Object", flatten: false, obj: {a: testString},
        test: function(obj){
            return obj.a && obj.a === testString;
        }
    },
    {   name: "Function", flatten: false,
        obj: function(){
            return "Hello World";
        },
        test: function(obj){
            return typeof obj === "function" && obj() === testString;
        }
    },
    {   name: "Array", flatten: false, obj: [0,1],
        test: function(obj){
            return typeof obj === "object" && Array.isArray(obj) && obj[0] === 0;
        }
    },
    {   name: "ObjectSerializer", obj: ObjectSerializer, flatten: true,
        test: function(obj){
            return obj.serialize && obj.deserialize;
        }
    },
    (function(){
        var t = new Greeter("Bob");
        return { name: "Greeter", obj: t, flatten: true,
            test: function(obj){
                return obj.greet && obj.greet() === t.greet();
            }
        };
    })(),
    (function(){
        var t = new MyGreeter("Bob");
        return { name: "MyGreeter (Inheritance)", obj: t, flatten: true,
            test: function(obj){
                return obj.greet && obj.greet() === t.greet();
            }
        };
    })()
];
// end TestCases

var failed = tests.filter(function(test){
    var result = test.test(ObjectSerializer.deserialize(ObjectSerializer.serialize(test.obj, test.flatten)));
    if(!result) console.log(test.name, "failed");
    return !result;
});

if(failed.length == 0) console.log("All Tests passed");
else console.log(failed.length + " Tests failed");

