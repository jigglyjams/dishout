import { JBConstants } from './constants';
import { getJBInterfaces } from './version';
import { JuiceBoxConfig, DistributePayoutsOfData, Distribution } from './types';

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

  async getAmountToDistribute(): Promise<Distribution> {
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

  async encodeDistributeFundsOf(distribution: Distribution) {
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
    return { address: this.JB.ETHPaymentTerminal.address, bytes: encodedDistribution };
  }

  async encodeDistributeReservedTokensOf() {
    const encodedDistribution = this.JB.Controller.interface.encodeFunctionData(
      'distributeReservedTokensOf',
      [this.projectId, 'distdance distributed these reserved tokens']
    );
    return { address: this.JB.Controller.address, bytes: encodedDistribution };
  }
}
