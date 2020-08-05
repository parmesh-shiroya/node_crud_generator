const { textWithRemoveQ } = require("../helper")




const getSchemaJson = (schemaObj) => {
    let fullSchema = {}
    Object.keys(schemaObj).forEach(k => {
        let v = schemaObj[k]
        let singleCollectionObj = {}
        switch (v.type) {
            case "string":
                singleCollectionObj.type = textWithRemoveQ("String")
                break;
            case "number":
                singleCollectionObj.type = textWithRemoveQ("Number")
                break;
            case "email":
                singleCollectionObj.type = textWithRemoveQ("String")
                singleCollectionObj.match = [
                    textWithRemoveQ("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"),
                    'Please add a valid ' + k
                ]
                break;
            case "enum":
                singleCollectionObj.type = textWithRemoveQ("String")
                singleCollectionObj.enum = v.enum;
                break;
            case "password":
                singleCollectionObj.type = textWithRemoveQ("String")
                break;
            case "boolean":
                singleCollectionObj.type = textWithRemoveQ("Boolean")
                break;
            case "ref":
                singleCollectionObj.type = textWithRemoveQ("mongoose.Schema.Types.ObjectId")
                singleCollectionObj.ref = v.ref;
                break;
            case "any":
                singleCollectionObj.type = textWithRemoveQ("mongoose.Schema.Types.Mixed")

                break;
            case "date":
                singleCollectionObj.type = textWithRemoveQ("Date")
                break;
            case "schema":
                if (v.schema.constructor === Object) {
                    singleCollectionObj = getSchemaJson(v.schema)
                }
                // TODO: finish this

                break;

        }

        if (v.required) {
            if (Array.isArray(v.required)) {
                singleCollectionObj.required = v.required
            } else
                singleCollectionObj.require = [v.required, "Please add " + k]
        }
        if (v.unique) {
            singleCollectionObj.unique = v.unique
        }
        if (v.maxLength != undefined) {
            singleCollectionObj.maxLength = v.maxLength
        }
        if (v.minLength != undefined) {
            singleCollectionObj.minLength = v.minLength
        }
        if (v.min != undefined) {
            singleCollectionObj.min = v.min
        } if (v.max != undefined) {
            singleCollectionObj.max = v.max
        }
        if (v.select != undefined) {
            singleCollectionObj.select = v.select
        }
        if (v.match != undefined) {
            if (Array.isArray(v.match)) {
                singleCollectionObj.match = [textWithRemoveQ(v.match[0]), v.match[1]]
            } else
                singleCollectionObj.match = [textWithRemoveQ(v.match), "Please add valid " + k]
        }
        if (v.default !== undefined) {
            singleCollectionObj.default = v.default
        }
        fullSchema[k] = singleCollectionObj
    })
    return fullSchema
}

exports.getSchemaJson = getSchemaJson