import 'dotenv/config';

export const keys = {
  INFURA_KEY: process.env.INFURA_KEY ?? '',
  RELAY: {
    mainnet: {
      KEY: process.env.RELAY_KEY ?? '',
      SECRET: process.env.RELAY_SECRET ?? '',
    },
    goerli: {
      KEY: process.env.RELAY_KEY_GOERLI ?? '',
      SECRET: process.env.RELAY_SECRET_GOERLI ?? '',
    }
  },
  DOLT_KEY: process.env.DOLT_KEY ?? ''
};
