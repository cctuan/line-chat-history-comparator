
const fs = require('fs')
const ChatParser = require('./../src/utils/ChatParser')

if (process.argv.length < 3) {
  console.error('Usage: node ' + process.argv[1] + ' FILENAME')
  process.exit(1)
}

const filename = process.argv[2]
const targetName = process.argv[3] || 'output'

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err
  const output = ChatParser(data)
  fs.writeFile(`_default/${targetName}.json`, JSON.stringify(output), 'utf8')
})
