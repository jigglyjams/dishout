import { BigNumberish } from 'ethers';
import { oneLine } from 'common-tags';
import { RelayerTransaction } from 'defender-relay-client';
import { Dolt } from '../../../lib/dolt/dolt';
import { keys } from '../../../keys';
import logger from '../../../logging';
import { Network } from '../../../lib/juicebox/types';

const dolt = new Dolt('jigglyjams', 'dishout', keys.DOLT_KEY);
const relayTransactions = 'relay_transactions';

export async function storeReceipt(projectId: BigNumberish, version: string, receipt: RelayerTransaction, gasEstimate: string, network?: Network) {
  const res = await dolt.write(oneLine`
    INSERT into ${(network) ? `${relayTransactions}_${network}` : relayTransactions}
    (
      projectId,
      version,
      transactionId,
      txnHash,
      gasEstimate
    )
    VALUES
    (
      ${projectId},
      '${version}',
      '${receipt.transactionId}',
      '${receipt.hash}',
      '${gasEstimate}'
    )
  ;`);
  logger.debug(res);
  return res;
}

export async function mergeReceipt(branch: string) {
  const mergeRes = await dolt.merge(branch);
  logger.debug(mergeRes);
  const deleteRes = dolt.delete(branch);
  logger.debug(deleteRes);
  return deleteRes;
}
