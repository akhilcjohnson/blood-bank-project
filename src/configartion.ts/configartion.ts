export default () => ({
    database: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: process.env.DB_ENTITIES,
        synchronize: process.env.DB_SYNCHRONIZE,
    },
    port: parseInt(process.env.PORT!, 10) || 3000,
   
});