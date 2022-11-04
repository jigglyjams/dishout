import { BigNumber } from 'ethers';
import { JBConstants } from './constants';
import { getJBInterfaces } from './version';
import {
  JuiceBoxConfig,
  DistributePayoutsOfData,
  Distribution,
  BasicTransaction
} from './types';

export class Juicebox {
  protected JB;
  protected projectId;

  constructor(
    config: JuiceBoxConfig
  ) {
    this.JB = getJBInterfaces(config.version, config.network);
    this.projectId = config.projectId;
  }

  currentConfiguration = async () => {
    return this.JB.FundingCycleStore.currentOf(this.projectId);
  };

  balanceOf = async () => {
    return this.JB.SingleTokenPaymentTerminalStore.balanceOf(this.JB.ETHPaymentTerminal.address, this.projectId);
  };

  metadataOf = async () => {
    return (await this.JB.Controller.currentFundingCycleOf(this.projectId)).metadata;
  };

  async getPayToDistribute(): Promise<Distribution> {
    const current = await this.currentConfiguration();
    const [distributionLimit, distributionCurrency] = await this.JB.Controller.distributionLimitOf(
      this.projectId,
      current.configuration,
      this.JB.ETHPaymentTerminal.address,
      JBConstants.TOKEN_ETH
    );
    const distributed = await this.JB.SingleTokenPaymentTerminalStore.usedDistributionLimitOf(
      this.JB.ETHPaymentTerminal.address,
      this.projectId,
      current.number
    );
    const balanceOf = await this.balanceOf();
    const alreadyDistributed = distributionLimit.sub(distributed);
    const distributable = (alreadyDistributed.gte(balanceOf)) ? balanceOf : alreadyDistributed;
    return { distributable, distributionCurrency };
  }

  encodeDistributeFundsOf(distribution: Distribution): BasicTransaction {
    const distributePayoutsOfData: DistributePayoutsOfData = [
      this.projectId,
      distribution.distributable,
      distribution.distributionCurrency,
      JBConstants.TOKEN_ETH,
      0,
      'distdance distributed this ETH'
    ];
    const encodedDistribution = this.JB.ETHPaymentTerminal.interface.encodeFunctionData(
      'distributePayoutsOf',
      distributePayoutsOfData
    );
    return { to: this.JB.ETHPaymentTerminal.address, data: encodedDistribution };
  }

  async getReserveToDistribute(): Promise<BigNumber> {
    const { reservedRate } = await this.metadataOf();
    return this.JB.Controller.reservedTokenBalanceOf(this.projectId, reservedRate);
  }

  encodeDistributeReservedTokensOf(): BasicTransaction {
    const encodedDistribution = this.JB.Controller.interface.encodeFunctionData(
      'distributeReservedTokensOf',
      [this.projectId, 'distdance distributed these reserved tokens']
    );
    return { to: this.JB.Controller.address, data: encodedDistribution };
  }
}
