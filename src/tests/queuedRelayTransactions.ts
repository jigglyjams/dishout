import { queuedRelayTransactions } from '../lib/relay';

async function main() {
  const queued = await queuedRelayTransactions('goerli', 'mined');
  console.log(queued);
}

main();
