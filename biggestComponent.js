/*
Every collection accepts below attributes
type: string,number,email,enum,password,boolean,ref,any,date,array[string],schema
required:boolean,
default:any,
select
min,
max
enum
match:regex
minLength,
maxLength
*/

exports.biggestSchema =
{
    name: "biggest",
    desciption: "Biggest component to test all thing",
    collectionName: "biggest",
    options: {
        timestamp: true

    },
    schema: {
        fieldString: { type: "string", required: [true, 'Please add fied 1'], unique: true },
        fieldString2: { type: "string", maxLength: 30, minLength: 10, required: [true, 'Please add fied 1'], unique: true },
        fieldNum: { type: "number", required: [true, 'Please add fied 1'], min: 0, max: 200 },
        fieldEmail: { type: "email" },
        fieldEnum: { type: "enum", enum: ["enum1", "enum2", "enum3"] },
        fieldPassword: { select: false, type: "password" },
        fieldMatch: { type: "string", required: true, match: /[0-9]{10}$/ },
        fieldBoolean: { type: "boolean", default: false },
        fieldRef: { type: "ref", ref: 'user', required: true },
        fieldAny: { type: "any" },
        fieldDate: { type: "date", format: "yyyy-MM-dd" },
        fieldDate2: { type: "date" },
        fieldDate3: { type: "date", fromFormat: "yyyy-MM-dd" },
        fieldSchema: { type: "schema", schema: "user" },
        fieldSchema2: { type: ["schema"], schema: "user" },
        fieldSchema3: {
            type: "schema",
            schema: {
                name: { type: "string" },
                gender: {
                    type: "enum", enum: ["m", "f"]
                }
            }
        }
    }
}