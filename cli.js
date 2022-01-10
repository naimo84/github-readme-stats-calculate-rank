import { Command, Option } from 'commander';
const program = new Command();
import { promisify } from 'node:util';
import stream from 'node:stream';
import fs from 'node:fs';
import got from 'got';
const pipeline = promisify(stream.pipeline);

async function getOptions(cli1, cli2, cli3) {
    let options = cli1;

    if (cli3 !== undefined) {
        options = cli2;
        options.argument = cli1;
    }

    options = Object.assign(options, program.opts());

    return options;
}

async function status(cli1, cli2, cli3) {
    const options = await getOptions(cli1, cli2, cli3)

    await pipeline(
        got.stream('https://raw.githubusercontent.com/anuraghazra/github-readme-stats/master/src/calculateRank.js'),
        fs.createWriteStream('calculateRank.cjs')
    );
    const calculateRank = await import('./calculateRank.cjs');

    console.log(calculateRank.default(options));
}

export async function execute(rawArgs) {
    try {
        program
            .command('calculateRank', { isDefault: true })
            .option('--totalRepos [totalRepos]', '', '0')
            .option('--totalCommits [totalCommits]', '', '0')
            .option('--contributions [contributions]', '', '0')
            .option('--followers [followers]', '', '0')
            .option('--prs [prs]', '', '0')
            .option('--issues [issues]', '', '0')
            .option('--stargazers [stargazers]', '', '0')
            .description('calculateRank')
            .action(status);

        await program.parseAsync(rawArgs);
    } catch (error) {
        console.error(error);
    }
}
