export const ENVIRONMENT = process.env.NODE_ENV || 'development';

// This is here to switch to use a non dockerized instance of the db (requires mongodb to be running locally)
// export const ENVIRONMENT = 'nonDocker' || process.env.NODE_ENV || 'development';
