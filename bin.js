#!/usr/bin/env node
var path = require('path')
try {
  var packageData = require(path.resolve('./package.json'))
  var licenseZeroData = require(path.resolve('./licensezero.json'))
} catch (error) {
  process.exit(1)
}
licenseZeroData.licensezero.forEach(function (entry, index) {
  if (index !== 0) console.log('\n')
  var id = entry.license.id || entry.license.projectID
  console.log(packageData.name + '@' + packageData.version)
  console.log(entry.license.terms + ' ' + entry.license.version)
  console.log('https://licensezero.com/ids/' + id)
})
