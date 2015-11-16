# ObjectSerializer

ObjectSerializer serializes and deserializes Javascript Objects. 
These Objects CAN contain functions, the code of these functions will be available after deserialization.

## Methods

### serialize(obj, flatten)
obj: Object to serialize
flatten: boolean, true if obj should serialize inherited properties

return: String representation of obj

### deserialize(str)
str: String representation of obj

return: Object
