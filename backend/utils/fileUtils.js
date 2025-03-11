const fs = require('node:fs/promises')
const path = require('node:path')

async function readData() {
    const filePath = path.join(__dirname, '../events.json')
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
}

async function writeData(data) {
    const filePath = path.join(__dirname, '../events.json')
    await fs.writeFile(filePath, JSON.stringify(data))
}

module.exports = {
    readData,
    writeData,
}
