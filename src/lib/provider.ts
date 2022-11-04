import { JsonRpcProvider } from '@ethersproject/providers';
import { Network } from './juicebox/types';
import { keys } from '../keys';

export const myProvider = (network: Network) => {
  const RPC_HOST = `https://${network}.infura.io/v3/${keys.INFURA_KEY}`;
  return new JsonRpcProvider(RPC_HOST);
};
