interface IConfig {
  nonDocker: {
    database: {
      url: string;
      port: string;
      name: string;
    };
    server: {
      host: string;
      port: string;
    };
  };
  development: {
    database: {
      url: string;
      port: string;
      name: string;
    };
    server: {
      host: string;
      port: string;
      url: string;
    };
  };
  production: unknown;
}

export const config: IConfig = {
  // For a local non-dockerized environment / testing
  nonDocker: {
    // Database
    database: {
      port: '27017',
      url: 'mongodb://127.0.0.1:27017/iot',
      name: 'iot',
    },
    // Server
    server: {
      host: 'localhost',
      port: '3001',
    },
  },
  development: {
    // Database
    database: {
      port: '27017',
      url: 'mongodb://mongo:27017/iot',
      name: 'iot',
    },
    // Server
    server: {
      host: 'localhost',
      port: '3001',
      url: 'http://localhost:3001',
    },
  },
  production: {},
};
