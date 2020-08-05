const _ = require('lodash')
const fse = require("fs-extra")
const pluralize = require('pluralize')
const { Ucfirst, Lcfirst, replaceQText } = require("./helper")
const { getSchemaJson } = require("./component/schemaGenerator")
const { getFunction, getOneFunction, createFunction, updateFunction, deleteFunction } = require("./component/controllerMethods")
_.templateSettings.interpolate = /{ ?{([\s\S]+?)} ?}/g;

let backendTemplatePath = process.cwd() + "/template/back-end";
let outputBackendPath = process.cwd() + "/output/back-end";
// Generate package json
let genPackageJson = (data) => {
    let template = fse.readFileSync(`${backendTemplatePath}/package.json.template`, 'utf8')
    fse.outputFile(`${outputBackendPath}/package.json`, _.template(template)(data))
}


// Generate .gitignore
let genGitignore = (data) => {
    fse.copyFileSync(`${backendTemplatePath}/.gitignore`, `${outputBackendPath}/.gitignore`)
}


// Generate server js
let genServerJS = (data) => {

    let template = fse.readFileSync(`${backendTemplatePath}/server.js.template`, 'utf8')
    // TODO: Replace appRoutes
    data.appRoutes = ""
    fse.outputFile(`${outputBackendPath}/server.js`, _.template(template)(data))
}

//TODO: Generate pm2 file for production use


// Generate Utils
let getUtils = () => {
    fse.ensureDirSync(`${outputBackendPath}/utils/`)
    let fileNames = fse.readdirSync(`${backendTemplatePath}/utils/`);
    fileNames.forEach(f => {
        fse.copyFileSync(`${backendTemplatePath}/utils/${f}`, `${outputBackendPath}/utils/${f}`)
    })
}



// Genreate middleware
//generate advnaced results

//generate async
// generate auth
//generate errror
// generate logger
//generate response handler
let genMiddlewares = () => {
    fse.ensureDirSync(`${outputBackendPath}/middleware/`)
    let fileNames = fse.readdirSync(`${backendTemplatePath}/middleware/`);
    fileNames.forEach(f => {
        fse.copyFileSync(`${backendTemplatePath}/middleware/${f}`, `${outputBackendPath}/middleware/${f}`)
    })
    // TODO: Add User logic in authMiddlware
}

// Generate config
// generate db fuke
// Generate .env file
let genConfigFiles = () => {
    fse.ensureDirSync(`${outputBackendPath}/config/`)
    let fileNames = fse.readdirSync(`${backendTemplatePath}/config/`);
    fileNames.forEach(f => {
        fse.copyFileSync(`${backendTemplatePath}/config/${f}`, `${outputBackendPath}/config/${f}`)
    })
    // TODO: Add User logic in authMiddlware
}

// Generate components
const getComponent = (data) => {

    generateComponent(data)

    generateSchema(data)
    generateRouter(data)
}

//Generate component
const generateComponent = (data) => {
    let template = fse.readFileSync(`${backendTemplatePath}/components/component/component.controller.js.template`, 'utf8')

    let methods = `
    ${getFunction}

    ${getOneFunction}

    ${createFunction}

    ${updateFunction}

    ${deleteFunction}
    `

    let templateData = {

        ModelName: Ucfirst(data.name),
        componentsName: pluralize(data.name),
        ComponentsName: Ucfirst(pluralize(data.name)),
        componentName: pluralize.singular(data.name),
        ComponentName: Ucfirst(pluralize.singular(data.name)),


    }
    templateData.appComponentMethods = _.template(methods)(templateData)

    fse.outputFile(`${outputBackendPath}/components/${Lcfirst(data.name)}/${Ucfirst(pluralize.singular(data.name))}.controller.js`, _.template(template)(templateData))
}


// Generate schema
const generateSchema = (data) => {
    let template = fse.readFileSync(`${backendTemplatePath}/components/component/component.schema.js.template`, 'utf8')
    let templateData = {
        ComponentName: Ucfirst(data.name),
        schemaJson: replaceQText(JSON.stringify(getSchemaJson(data.schema), null, 4)),
        schemaOptions: JSON.stringify(data.options || {}, null, 4),
        collectionName: data.collectionName || data.name
    }

    fse.outputFile(`${outputBackendPath}/components/${Lcfirst(data.name)}/${Ucfirst(pluralize.singular(data.name))}.schema.js`, _.template(template)(templateData))
}

// Generate Router
const generateRouter = (data) => {
    let template = fse.readFileSync(`${backendTemplatePath}/components/component/index.js.template`, 'utf8')
    let templateData = {
        ComponentsName: Ucfirst(pluralize(data.name)),
        ModelName: Ucfirst(data.name),
        ComponentName: Ucfirst(pluralize.singular(data.name)),
    }

    fse.outputFile(`${outputBackendPath}/components/${Lcfirst(data.name)}/index.js`, _.template(template)(templateData))

}
// Generate constant
//generate router
//generate dal


module.exports = { genPackageJson, genGitignore, genServerJS, getUtils, genMiddlewares, genConfigFiles, getComponent }