import { Dolt } from '../lib/dolt/dolt';
import { keys } from '../keys';
import { sleep } from '../lib/utils';

const table = 'tablename';
const randomKey = Math.floor(Math.random() * 1000);
const randomString = (Math.random() + 1).toString(36).substring(7);

async function main() {
  const dolt = new Dolt('jigglyjams', 'api-test', keys.DOLT_KEY);
  console.log(await dolt.metadata());
  console.log(await dolt.query(`SELECT * FROM ${table};`));
  const newBranchOperation = await dolt.write(`insert into ${table} (pk, \`col1\`) values (${randomKey}, '${randomString}');`);
  console.log(newBranchOperation);
  await sleep(5000);
  const merge = await dolt.merge(newBranchOperation.to_branch_name);
  console.log(merge);
  await sleep(1000);
  console.log(await dolt.delete(newBranchOperation.to_branch_name));
}

main();
