/* eslint-disable no-await-in-loop */
import { Relayer, RelayerTransactionPayload } from 'defender-relay-client';
import { BigNumber } from 'ethers';
import { keys } from '../keys';
import { Network, BasicTransaction } from './juicebox/types';
import { sleep } from './utils';
import logger from '../logging';
import { toGwei } from '../api/v1/helpers/generic';

export type TransactionStatus = 'pending' | 'mined' | 'failed';

const initRelay = (network = 'mainnet' as Network) => {
  const relayKeys = { apiKey: keys.RELAY[network].KEY, apiSecret: keys.RELAY[network].SECRET };
  return new Relayer(relayKeys);
};

export async function relayTransaction(gasEstimate: BigNumber, txn: BasicTransaction, network = 'mainnet' as Network) {
  const relay = initRelay(network);
  const betterGas = Math.floor(Number(toGwei(gasEstimate)) + 500_000);
  const relayPayload: RelayerTransactionPayload = {
    to: txn.to,
    value: 0,
    data: txn.data,
    gasLimit: betterGas,
    speed: 'safeLow'
  };
  return relay.sendTransaction(relayPayload).then((res) => {
    return res;
  }).catch((e) => {
    return Promise.reject(e.response);
  });
}

export async function queuedRelayTransactions(network = 'mainnet' as Network, status?: TransactionStatus) {
  const relay = initRelay(network);
  return relay.list({ status }).catch((e) => {
    return Promise.reject(e.response);
  });
}
