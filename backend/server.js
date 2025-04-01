const app = require('./index')
const { PORT } = require('./configs/configs')

const dbConnection = require('./database/mongooseConnection')
dbConnection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
