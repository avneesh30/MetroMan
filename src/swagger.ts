import swaggerJsdoc from 'swagger-jsdoc';

const isProduction = true;
const BASE_URL = isProduction ? 'https://softwarera.com' : `http://localhost:${process.env.PORT || 3000}`;


const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MetroMan API',
            version: '1.0.0',
            description: 'API documentation for the Metro service like homw clean',
        },
        servers: [
            {
                url: BASE_URL,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: [],
        }],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts'], // files containing annotations as above
};

export const swaggerSpec = swaggerJsdoc(options);