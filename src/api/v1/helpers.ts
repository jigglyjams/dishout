import { BigNumberish } from 'ethers';
import { VERY_SMALL } from '../../lib/juicebox/constants';
import { Distribution } from '../../lib/juicebox/types';

export const isSubscriber = (projectId: BigNumberish) => {
  return true;
};

export async function shouldDistributePay(distribution: Distribution, projectId: BigNumberish) {
  return (
    distribution.distributable.gte(VERY_SMALL)
    && isSubscriber(projectId)
  );
}
