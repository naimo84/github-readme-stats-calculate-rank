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

        fs.createWriteStream(new URL('./calculateRank.mjs', import.meta.url))
    );
    const calculateRank = await import(new URL('./calculateRank.mjs', import.meta.url));

    console.log(calculateRank.default(options));



}

export async function execute(rawArgs) {
    try {
        let repos = new Option('--repos [repos]', '');
        repos.defaultValue=0;

        let all_commits = new Option('--all_commits [all_commits]', '');        
        all_commits.defaultValue=0;

        let commits = new Option('--commits [commits]', '');
        commits.defaultValue=0;

        let contributions = new Option('--contributions [contributions]', '');
        contributions.defaultValue=0;

        let followers = new Option('--followers [followers]', '');
        followers.defaultValue=0;

        let prs = new Option('--prs [prs]', '');
        prs.defaultValue=0;

        let issues = new Option('--issues [issues]', '');
        issues.defaultValue=0;

        let stars = new Option('--stars [stars]', '');
        stars.defaultValue=0;


        let reviews = new Option('--reviews [reviews]', '');
        reviews.defaultValue=0;

        program.addOption(repos);
        program.addOption(all_commits)
        program.addOption(commits);
        program.addOption(contributions);
        program.addOption(followers);
        program.addOption(prs);
        program.addOption(issues);
        program.addOption(stars);
        program.addOption(reviews);

        

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
