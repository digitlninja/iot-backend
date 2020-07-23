// Uncomment to switch when using a non dockerized instance (switches the db and server config, requires mongo to be running locally)
const useNonDocker = true;
export const ENVIRONMENT = useNonDocker
  ? 'nonDocker'
  : process.env.NODE_ENV || 'development';

export const cognitoTokenTypes = {
  id: 'id',
  access: 'access',
  refresh: 'refresh',
};
