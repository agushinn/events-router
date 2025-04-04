const fs = require('node:fs/promises')
const path = require('node:path')

async function readData(file) {
    try {
        const filePath = path.resolve(__dirname, '../', file)
        const data = await fs.readFile(filePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error(`Error reading file ${file}:`, error.message)
        throw new Error(`Could not read file: ${file}`)
    }
}

async function writeData(file, data) {
    try {
        const filePath = path.resolve(__dirname, '../', file)
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
        console.log(`File ${file} written successfully.`)
    } catch (error) {
        console.error(`Error writing file ${file}:`, error.message)
        throw new Error(`Could not write file: ${file}`)
    }
}

async function clearImage(file) {
    try {
        const filePath = path.join(__dirname, '../', file)
        await fs.unlink(filePath)
        console.log(`File ${filePath} deleted successfully.`)
    } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error.message)
        throw new Error(`Could not delete file: ${filePath}`)
    }
}

module.exports = {
    readData,
    writeData,
    clearImage,
}
