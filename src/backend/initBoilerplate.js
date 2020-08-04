const _ = require('lodash')
const fse = require("fs-extra")
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
// Generate constant
//Generate component
// generate controllr
//generate router
//generate model
//generate dal


module.exports = { genPackageJson, genGitignore, genServerJS, getUtils, genMiddlewares, genConfigFiles }