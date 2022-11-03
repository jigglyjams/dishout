import express from 'express';
import { Juicebox } from '../../lib/juicebox/juicebox';
import { relayTransaction, queued, TransactionStatus } from '../../lib/relay';
import { JuiceBoxConfig, Network } from '../../lib/juicebox/types';
import { shouldDistributePay } from './helpers';

const DEFAULT_VERSION = '2';
const router = express.Router();

router.use('/distribute/pay', async (req, res) => {
  const { version = DEFAULT_VERSION, network = 'mainnet', projectId } = req.query as JuiceBoxConfig;
  const juice = new Juicebox({ version, projectId, network });
  const distribution = await juice.getAmountToDistribute();
  const data = await juice.encodeDistributeFundsOf(distribution);
  if (!(await shouldDistributePay(distribution, projectId))) return res.json({ success: false, error: 'no distribution' });
  return relayTransaction(data, network).then((relayRes) => {
    res.json({ success: true, data: relayRes });
  }).catch((e) => {
    res.json({ success: false, error: e });
  });
});

router.use('/distribute/reserve', async (req, res) => {
  const { version = DEFAULT_VERSION, network = 'mainnet', projectId } = req.query as JuiceBoxConfig;
  const juice = new Juicebox({ version, projectId, network });
  const data = await juice.encodeDistributeReservedTokensOf();
  return relayTransaction(data, network).then((relayRes) => {
    res.json({ success: true, data: relayRes });
  }).catch((e) => {
    res.json({ success: false, error: e });
  });
});

router.use('/queued', async (req, res) => {
  const { network = 'mainnet', status } = req.query;
  return queued(network as Network, status as TransactionStatus).then((relayRes) => {
    res.json({ success: true, data: relayRes });
  }).catch((e) => {
    res.json({ success: false, error: e });
  });
});

export default router;
