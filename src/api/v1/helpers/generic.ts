import { BigNumber, BigNumberish, utils } from 'ethers';
import { VERY_SMALL } from '../../../lib/juicebox/constants';
import { BasicTransaction, Distribution, Network } from '../../../lib/juicebox/types';
import { myProvider } from '../../../lib/provider';

export async function shouldDistributePay(distribution: Distribution, projectId: BigNumberish) {
  return distribution.distributable.gte(VERY_SMALL);
}

export async function shouldDistributeReserve(reserve: BigNumber, projectId: BigNumberish) {
  return reserve.gte(VERY_SMALL);
}

export const toGwei = (num: BigNumber) => {
  return utils.formatUnits(num, 'gwei');
};

export const toEth = (num: BigNumber) => {
  return utils.formatUnits(num);
};

export const estimateTxnCost = async (txn: BasicTransaction, network = 'mainnet') => {
  const provider = myProvider(network as Network);
  const gasPrice = await provider.getGasPrice();
  const estimateUsage = await provider.estimateGas({ to: txn.to, data: txn.data, value: 0 });
  return gasPrice.mul(estimateUsage);
};

export const getGweiSpent = async (hash: string, network: Network) => {
  const provider = myProvider(network as Network);
  const txn = await provider.getTransactionReceipt(hash);
  const gasSpentInEth = toGwei(
    txn.effectiveGasPrice.mul(txn.gasUsed)
  );
  return gasSpentInEth;
};
