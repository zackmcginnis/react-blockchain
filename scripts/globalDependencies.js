const npm = require('npm')
const myConfigObject = { global: true };
npm.load(myConfigObject, function (er) {
  if (er) return handlError(er)
  npm.commands.install(['truffle', 'ethereumjs-testrpc', 'geth'], function (er, data) {
    if (er) console.log("err", er)
    // command succeeded, and data might have some info
  })
  npm.registry.log.on('log', function (message) {
  //console.log("message", message)
  })
})
