import { Juicebox } from '../lib/juicebox/juicebox';

async function main() {
  const juice = new Juicebox({ version: '2', projectId: 115, network: 'mainnet' });
  const d = await juice.getPayToDistribute();
  console.log('distributePayouts');
  console.log(Number(d.distributable.toString()) / (1 * 1E18));
  console.log(d.distributable.toString());
  console.log('distributeReserved');
  console.log(juice.encodeDistributeReservedTokensOf());
  console.log((await juice.getReserveToDistribute()).toString());
}

main();
