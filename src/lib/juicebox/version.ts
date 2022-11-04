import {
  getJBController as getJBControllerV2,
  getJBFundingCycleStore as getJBFundingCycleStoreV2,
  getJBETHPaymentTerminal as getETHPaymentTerminalV2,
  getJBSingleTokenPaymentTerminalStore as getJBSingleTokenPaymentTerminalStoreV2
} from 'juice-sdk';
import {
  getJBController as getJBControllerV3,
  getJBFundingCycleStore as getJBFundingCycleStoreV3,
  getJBETHPaymentTerminal as getETHPaymentTerminalV3,
  getJBSingleTokenPaymentTerminalStore as getJBSingleTokenPaymentTerminalStoreV3
} from '@jigglyjams/juice-sdk-v3';
import { JBInterfaces, Network } from './types';
import { myProvider } from '../provider';

export const getJBInterfaces = (version: string, network = 'mainnet' as Network): JBInterfaces => {
  const provider = myProvider(network);
  if (version === '2') {
    return {
      Controller: getJBControllerV2(provider, { network: network as 'mainnet' | 'rinkeby' }),
      FundingCycleStore: getJBFundingCycleStoreV2(provider, { network: network as 'mainnet' | 'rinkeby' }),
      ETHPaymentTerminal: getETHPaymentTerminalV2(provider, { network: network as 'mainnet' | 'rinkeby' }),
      SingleTokenPaymentTerminalStore: getJBSingleTokenPaymentTerminalStoreV2(provider, { network: network as 'mainnet' | 'rinkeby' })
    };
  }
  if (version === '3') {
    return {
      Controller: getJBControllerV3(provider, { network: network as 'mainnet' | 'goerli' }),
      FundingCycleStore: getJBFundingCycleStoreV3(provider, { network: network as 'mainnet' | 'goerli' }),
      ETHPaymentTerminal: getETHPaymentTerminalV3(provider, { network: network as 'mainnet' | 'goerli' }),
      SingleTokenPaymentTerminalStore: getJBSingleTokenPaymentTerminalStoreV3(provider, { network: network as 'mainnet' | 'goerli' })

    };
  }
  throw new Error('Unsupported juicebox version number');
};
