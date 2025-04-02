const app = require('./index')
const { PORT } = require('./configs/configs')

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
