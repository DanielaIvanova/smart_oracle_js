require = require('esm')(module/*, options */)
const main = require('./index.js').default
main().catch(e => {
    console.log('error ->')
    console.log(e)
})
