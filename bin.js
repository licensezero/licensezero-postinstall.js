#!/usr/bin/env node
var path = require('path')

// Load package.json and licensezero.json data.

var packageDataPath, licenseZeroDataPath
var packageData, licenseZeroData

// Optionally accept the path of the package as an argument.
var directory = process.argv[2]
if (directory) {
  packageDataPath = path.join(directory, 'package.json')
  licenseZeroDataPath = path.join(directory, 'licensezero.json')
} else {
  packageDataPath = path.resolve('./package.json')
  licenseZeroDataPath = path.resolve('./licensezero.json')
}

try {
  packageData = require(packageDataPath)
} catch (error) {
  console.error('Could not read and parse ' + packageDataPath)
  process.exit(1)
}

try {
  licenseZeroData = require(licenseZeroDataPath)
} catch (error) {
  console.error('Could not read and parse ' + licenseZeroDataPath)
  process.exit(1)
}

// Sanity check licensezero.json.

var entries = licenseZeroData.licensezero
if (!Array.isArray(entries) || entries.length === 0) {
  console.error(
    'licensezero.json\'s licensezero property is empty or invalid.'
  )
  process.exit(1)
}

// Wrap all messages at 60 columns.

var wrap = require('word-wrap')

var options = {
  width: 65,
  indent: '',
  newline: '\n'
}
function print (message) {
  message = message || ''
  process.stdout.write(wrap(message, options) + '\n')
}

// Ensure licensezero.json has at least one entry for
// Parity or Prosperity terms.

var haveParity = false
var haveProsperity = false

for (var index = 0; index < entries.length; index++) {
  var terms = entries[index].license.terms
  if (terms === 'parity') haveParity = true
  if (terms === 'prosperity') haveProsperity = true
  if (haveParity && haveProsperity) break
}

if (!haveParity && !haveProsperity) process.exit(1)

// Print our messages.

// figlet, font: lvrit
process.stdout.write([
  '  _     ___ ____ _____ _   _ ____  _____   __________ ____   ___',
  ' | |   |_ _/ ___| ____| \\ | / ___|| ____| |__  / ____|  _ \\ / _ \\',
  ' | |    | | |   |  _| |  \\| \\___ \\|  _|     / /|  _| | |_) | | | |',
  ' | |___ | | |___| |___| |\\  |___) | |___   / /_| |___|  _ <| |_| |',
  ' |_____|___\\____|_____|_| \\_|____/|_____| /____|_____|_| \\_\\\\___/',
  ''
].join('\n') + '\n')

print(
  packageData.name + ' ' + packageData.version +
  ' is a License Zero package.'
)

if (haveParity) {
  print()
  print(
    'Contributions to this package ' +
    'are free to use in open source ' +
    'under the Parity Public License.  ' +
    'Licenses for use in closed software ' +
    'are available via licensezero.com.'
  )
}

if (haveProsperity) {
  print()
  print(
    'Contributions to this package ' +
    'are free to use for commercial purposes ' +
    'for a trial period ' +
    'under the Prosperity Public License.  ' +
    'Licenses for long-term commercial use ' +
    'are available via licensezero.com.'
  )
}

print()
print('See:')
print()
entries.forEach(function (entry) {
  print(
    'https://licensezero.com/ids/' +
    (entry.license.id || entry.license.projectID)
  )
})
print()

process.exit(0)
