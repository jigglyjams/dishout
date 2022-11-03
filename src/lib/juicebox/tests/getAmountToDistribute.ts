import { Juicebox } from '../juicebox';

async function main() {
  const juice = new Juicebox({ version: '3', projectId: 37, network: 'goerli' });
  const d = await juice.getAmountToDistribute();
  console.log('distributePayouts');
  console.log(Number(d.distributable.toString()) / (1 * 1E18));
  console.log(d.distributionLimitCurrency.toString());
  console.log('distributeReserved');
  console.log(await juice.encodeDistributeReservedTokensOf());
}

main();
