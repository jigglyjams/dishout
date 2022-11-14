import express from 'express';
import { myProvider } from '../../lib/provider';

const router = express.Router();
const provider = myProvider('mainnet');

const getENS = async (address: string) => {
  return provider.lookupAddress(address).then((res) => {
    return res;
  }).catch(() => {
    return null;
  });
};

const getAddress = async (name: string) => {
  return provider.resolveName(name).then((res) => {
    return res;
  }).catch(() => {
    return null;
  });
};

router.use('/:nameOrAddress', async (req, res) => {
  const { nameOrAddress } = req.params;
  const isName = nameOrAddress.includes('.eth');
  const results = (isName) ? await getAddress(nameOrAddress) : await getENS(nameOrAddress);
  return res.send(results);
});

export default router;
