import { getGweiSpent } from '../api/v1/helpers/generic';

async function main() {
  const spent = await getGweiSpent('0x21e19ec4f9e7554b486e6adfe19e072b119138f1ae1683fb5ab105608a2ab8ce', 'goerli');
  console.log(spent);
}

main();
