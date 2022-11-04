import { RelayerTransaction } from 'defender-relay-client';
import { storeReceipt } from '../api/v1/helpers/db';

const txn: RelayerTransaction = {
  transactionId: '5fcb8a6d-8d3e-403a-b33d-ade27ce0f85a',
  hash: '0x968a6eba76005f9f133f33bb728e6192373ce6f0a34b04464c3a2e792db79c33',
  to: '',
  from: '',
  speed: 'safeLow',
  gasLimit: 41000,
  nonce: 12,
  status: 'mined',
  chainId: 5,
  validUntil: '',
  maxFeePerGas: 1,
  maxPriorityFeePerGas: 1
};

async function main() {
  const doltResponse = await storeReceipt('37', '3', txn, '2121212', 'goerli');
  console.log(doltResponse);
}

main();
