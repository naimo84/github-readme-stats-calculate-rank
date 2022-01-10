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
    if (!options.totalCommits || options.totalCommits === '0') {
        return;
    }
    await pipeline(
        got.stream('https://raw.githubusercontent.com/anuraghazra/github-readme-stats/master/src/calculateRank.js'),

        fs.createWriteStream(new URL('./calculateRank.cjs', import.meta.url))
    );
    const calculateRank = await import(new URL('./calculateRank.cjs', import.meta.url));

    console.log(calculateRank.default(options));
}

export async function execute(rawArgs) {
    try {
        program.addOption(new Option('--totalRepos [totalRepos]', '', '0'));
        program.addOption(new Option('--totalCommits [totalCommits]', '', '0'));
        program.addOption(new Option('--contributions [contributions]', '', '0'));
        program.addOption(new Option('--followers [followers]', '', '0'));
        program.addOption(new Option('--prs [prs]', '', '0'));
        program.addOption(new Option('--issues [issues]', '', '0'));
        program.addOption(new Option('--stargazers [stargazers]', '', '0'));

        program
            .command('calculateRank', { isDefault: true })
            .description('calculateRank')
            .action(status);

        await program.parseAsync(rawArgs);
        if (process.argv.length < 3) {
            program.help();
        }
    } catch (error) {
        console.error(error);
    }
}
