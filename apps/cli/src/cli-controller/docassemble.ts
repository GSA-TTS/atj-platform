/*
import { Command } from 'commander';
import { Context } from './types';

const addDocassembleCommands = (ctx: Context, cli: Command) => {
  const docassemble = cli
    .command('docassemble')
    .description('docassemble commands');

  docassemble
    .command('populate')
    .description('populate a docassemble instance with test data')
    .option(
      '-r, --repository',
      'repository to populate from',
      'https://github.com/SuffolkLITLab/docassemble-MassAccess'
    )
    .option('-b, --branch', 'branch of git repository to populate from', 'main')
    .action(async ({ repository, branch }) => {
      const client = new DocassembleClient(ctx.docassemble);
      const result = await client.addPackage(repository, branch);
      ctx.console.log('populated docassemble instance', result);
    });

  docassemble
    .command('list-interviews')
    .description('list docassemble interviews')
    .action(async () => {
      const client = new DocassembleClient(ctx.docassemble);
      const interviews = await client.getInterviews();
      ctx.console.log('populated docassemble instance');
    });
};
*/
