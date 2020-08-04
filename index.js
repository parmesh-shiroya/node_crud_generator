let { genPackageJson, genGitignore, genServerJS, getUtils, genMiddlewares, genConfigFiles } = require('./src/backend/initBoilerplate')


genPackageJson({ appName: "Ones", appDescription: "Onest description" })
genGitignore()
genServerJS({})
getUtils()
genMiddlewares()
genConfigFiles()