import express from 'express';
import { Juicebox } from '../../lib/juicebox/juicebox';
import { JuiceBoxConfig } from '../../lib/juicebox/types';
import { estimateTxnCost, shouldDistributePay, shouldDistributeReserve, toEth } from './helpers/generic';
import { relayAndStoreReceipt } from './helpers/transactor';

const DEFAULT_VERSION = '2';
const router = express.Router();

router.use('/pay', async (req, res) => {
  const { version = DEFAULT_VERSION, network = 'mainnet', projectId } = req.query as JuiceBoxConfig;
  const { sendTxn = false } = req.query;
  const juice = new Juicebox({ version, projectId, network });
  const distribution = await juice.getPayToDistribute();
  if (!(await shouldDistributePay(distribution, projectId))) {
    return res.json({ success: false, error: `distribution too small, ${toEth(distribution.distributable)} ETH` });
  }
  const data = juice.encodeDistributeFundsOf(distribution);
  if (sendTxn) {
    const estimate = await estimateTxnCost(data, network);
    return res.json(await relayAndStoreReceipt(estimate, data, projectId, version, network));
  }
  return res.json({ success: false, data });
});

router.use('/reserve', async (req, res) => {
  const { version = DEFAULT_VERSION, network = 'mainnet', projectId } = req.query as JuiceBoxConfig;
  const { sendTxn = false } = req.query;
  const juice = new Juicebox({ version, projectId, network });
  const reserve = await juice.getReserveToDistribute();
  if (!(await shouldDistributeReserve(reserve, projectId))) {
    return res.json({ success: false, error: `distribution too small, ${reserve}` });
  }
  const data = juice.encodeDistributeReservedTokensOf();
  if (sendTxn) {
    const estimate = await estimateTxnCost(data, network);
    return res.json(await relayAndStoreReceipt(estimate, data, projectId, version, network));
  }
  return res.json({ success: true, data });
});

export default router;
