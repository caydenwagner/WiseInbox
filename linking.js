const config = {
  screens: {
    LoginScreen: {
      path: 'login/:params',
      parse: {
        name: params => `${params}`,
      },
    },
    LoginScreen: {
      path: 'ViewEmailScreen/:params',
      parse: {
        name: params => `${params}`,
      },
    },
  },
};

const linking = {
  prefixes: ['WiseInbox://app'],
  config,
};

export default linking;