export default () => ({
    port: process.env.APP_PORT,
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME,
        url: process.env.DATABASE_URL,
        nonDockerUrl: process.env.DATABASE_URL_NON_DOCKER,
    },
    app: {
        environment: process.env.APP_ENV,
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
        url: process.env.APP_URL,
    },
    ui: {
        url: process.env.IOT_UI_URL,
    },
    cognito: {
        userPoolId: process.env.COGNITO_USER_POOL_ID,
        clientId: process.env.COGNITO_CLIENT_ID,
        region: process.env.COGNITO_REGION,
    },
});
