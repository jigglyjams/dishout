import express from 'express';
import { BasicTransaction, Network } from '../../lib/juicebox/types';
import { myProvider } from '../../lib/provider';
import { toEth, toGwei } from './helpers/generic';

const router = express.Router();

router.use('/gwei', async (req, res) => {
  const { network = 'mainnet' } = req.query;
  const provider = myProvider(network as Network);
  const gasPrice = toGwei(await provider.getGasPrice());
  return res.json({ sucess: true, data: `current gas price on ${network}: ${gasPrice}` });
});

router.use('/estimate', async (req, res) => {
  const { to, data } = req.query as BasicTransaction;
  const { network = 'mainnet' } = req.query;
  const provider = myProvider(network as Network);
  const gasPrice = await provider.getGasPrice();
  const estimateUsage = await provider.estimateGas({ to, data, value: 0 });
  const estimate = toEth(gasPrice.mul(estimateUsage));
  return res.json({ sucess: true, data: `estimate on ${network}: ${estimate}` });
});

export default router;
