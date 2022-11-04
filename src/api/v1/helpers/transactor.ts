/* eslint-disable no-await-in-loop */
import { BigNumber, BigNumberish } from 'ethers';
import { BasicTransaction, Network } from '../../../lib/juicebox/types';
import { relayTransaction } from '../../../lib/relay';
import { estimateTxnCost, toGwei } from './generic';
import { storeReceipt } from './db';
import logger from '../../../logging';

export async function relayAndStoreReceipt(gasEstimate: BigNumber, data: BasicTransaction, projectId: BigNumberish, version: string, network: Network) {
  const receipt = await relayTransaction(gasEstimate, data, network).then((relayRes) => {
    return relayRes;
  }).catch((e) => {
    logger.error(e);
    throw Error();
  });
  const doltRes = await storeReceipt(projectId, version, receipt, toGwei(gasEstimate), network);
  if (doltRes.query_execution_status === 'Success') return { success: true, data: receipt.hash };
  return { success: false, error: `dolt ${doltRes.operation_name} failed` };
}
