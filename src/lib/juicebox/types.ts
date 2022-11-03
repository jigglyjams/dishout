import { BigNumberish, BigNumber } from 'ethers';
import {
  JBController as JBControllerV2,
  JBETHPaymentTerminal as JBETHPaymentTerminalV2,
  JBFundingCycleStore as JBFundingCycleStoreV2,
  JBSingleTokenPaymentTerminalStore as JBSingleTokenPaymentTerminalStoreV2
} from 'juice-sdk';

import {
  JBController as JBControllerV3,
  JBETHPaymentTerminal as JBETHPaymentTerminalV3,
  JBFundingCycleStore as JBFundingCycleStoreV3,
  JBSingleTokenPaymentTerminalStore as JBSingleTokenPaymentTerminalStoreV3
} from '@jigglyjams/juice-sdk-v3';

export type Network = 'mainnet' | 'goerli';

export type JuiceBoxConfig = {
  version: string;
  projectId: BigNumberish;
  network?: Network;
};

export type DistributePayoutsOfData = [
  BigNumberish, // projectId
  BigNumberish, // amount
  BigNumberish, // currency
  string, // token
  BigNumberish, // minReturnedTokens
  string // memo
];

export type JBInterfaces = {
  Controller: JBControllerV2 | JBControllerV3;
  FundingCycleStore: JBFundingCycleStoreV2 | JBFundingCycleStoreV3;
  ETHPaymentTerminal: JBETHPaymentTerminalV2 | JBETHPaymentTerminalV3;
  SingleTokenPaymentTerminalStore: JBSingleTokenPaymentTerminalStoreV2 | JBSingleTokenPaymentTerminalStoreV3;
};

export type BasicTransaction = {
  address: string,
  bytes: string;
};

export type Distribution = {
  distributable: BigNumber,
  distributionCurrency: BigNumber
};
