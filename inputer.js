const { biggestSchema } = require("./biggestComponent.js")
const { rolesSchema, userSchema } = require("./userComponent.js")

module.exports = {
    appName: "",
    appDescription: "",
    appComponents: [biggestSchema, rolesSchema, userSchema]
}