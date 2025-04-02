const swaggerUi = require('swagger-ui-express')
const path = require('path')
const YAML = require('yamljs')

const swaggerMiddleware = (app) => {
    const openApiDocument = YAML.load(path.join(__dirname, '../swagger.yaml'))

    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(openApiDocument, {
            customSiteTitle: 'API Docs',
            customCssUrl: 'https://unpkg.com/swagger-ui-dist@4/swagger-ui.css',
        }),
    )

    app.use(
        '/swagger-ui',
        require('express').static(
            path.join(__dirname, '../node_modules', 'swagger-ui-dist'),
        ),
    )
}

module.exports = swaggerMiddleware
