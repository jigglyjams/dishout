import { Relayer, RelayerTransactionPayload } from 'defender-relay-client';
import { keys } from '../keys';
import { Network, BasicTransaction } from './juicebox/types';

export type TransactionStatus = 'pending' | 'mined' | 'failed';

export async function relayTransaction(txn: BasicTransaction, network = 'mainnet' as Network) {
  const relayKeys = { apiKey: keys.RELAY[network].KEY, apiSecret: keys.RELAY[network].SECRET };
  const relay = new Relayer(relayKeys);
  const relayPayload: RelayerTransactionPayload = {
    to: txn.address,
    value: 0,
    data: txn.bytes,
    gasLimit: 410000,
    speed: 'safeLow'
  };
  return relay.sendTransaction(relayPayload).then((res) => {
    return res;
  }).catch((e) => {
    return Promise.reject(e.response);
  });
}

export async function queued(network = 'mainnet' as Network, status?: TransactionStatus) {
  const relayKeys = { apiKey: keys.RELAY[network].KEY, apiSecret: keys.RELAY[network].SECRET };
  const relay = new Relayer(relayKeys);
  return relay.list({ status }).catch((e) => {
    return Promise.reject(e.response);
  });
}
