let { genPackageJson, genGitignore, genServerJS, getUtils, getComponent, genMiddlewares, genConfigFiles } = require('./src/backend/initBoilerplate')
let { appComponents, appName, appDescription } = require('./inputer')



genPackageJson({ appName, appDescription })
genGitignore()
genServerJS({})
getUtils()
genMiddlewares()
genConfigFiles()

appComponents.forEach(c => {
    getComponent(c)
})
