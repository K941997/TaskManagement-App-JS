/* eslint-disable prettier/prettier */
// Only .js work, but env not working on docker

//!TypeOrm PostgreSQL Database Config:
let dbConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
    migrationsRun: false,
    synchronize: false,
    logging: false,

    migrations: ['dist/migrations/*.js'],
    entities: ['**/*.entity.js'],
    
    cli: {
      migrationsDir: 'migrations', // create migration file and save to this folder
    },
  };
  
  switch (process.env.NODE_ENV) {
    case 'development':
      dbConfig = {
        ...dbConfig,
        migrationsRun: true,
        logging: false,
      };
      break;
    case 'test':
      dbConfig = {
        ...dbConfig,
        // type: 'sqlite',
        migrationsRun: true,
        entities: ['**/*.entity.ts'],
      };
      break;
    case 'production':
      dbConfig = {
        ...dbConfig,
      };
      break;
  
    default:
      throw new Error('unknow environment typeorm config');
  }
  
  module.exports = dbConfig;
  