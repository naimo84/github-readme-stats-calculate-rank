# github-readme-stats-calculate-rank

Commandline tool to calculate your [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) rank, using the latest and official [calculateRank.js](https://github.com/anuraghazra/github-readme-stats/blob/master/src/calculateRank.js)

## :question: Get Help

For bug reports and feature requests, open issues. :bug:

## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications _for free_! You can even change the source code and redistribute (even resell it).

Thank you to all my backers!
### People

- [fflorent](https://github.com/fflorent)
- [Speeedy0815](https://github.com/Speeedy0815)
- Ralf S.
- Enno L.
- Jürgen G.
- Mark MC G.
- Kay-Uwe M.
- Craig O.
- Manuel G.

### Become a backer

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

- Starring and sharing the projects you like :rocket:
- **Crypto.&#65279;com** &nbsp;—&nbsp; Use my referral link https://crypto.com/app/f2smbah8fm to sign up for Crypto.&#65279;com and we both get $25 USD :)  

- [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)][paypal-donations] &nbsp; — &nbsp; You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
- [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T412CXA) &nbsp;—&nbsp; I'll buy a ~~tea~~ coffee. :coffee: :wink:


Thanks! :heart:

## :yum: How to contribute

Have an idea? Found a bug? See [how to contribute][contributing].

## :memo: Documentation  

```sh
Usage: calculateRank [options] [command]

Options:
  --totalRepos [totalRepos]
  --totalCommits [totalCommits]
  --contributions [contributions]
  --followers [followers]
  --prs [prs]
  --issues [issues]
  --stargazers [stargazers]
  -h, --help                       display help for command

Commands:
  calculateRank                    calculateRank
  help [command]                   display help for command
```

call from cli:
```sh
npx github-readme-stats-calculate-rank@latest --totalRepos 25 --totalCommits 1800 --contributions 11 --followers 16 --prs 16 --issues 51 --stargazers 127
```
output:
```js
{ level: 'A++', score: 44.902066802062436 }
```


[badge_brave]: ./docs/support_banner.png
[badge_paypal]: https://img.shields.io/badge/Donate-PayPal-blue.svg
[paypal-donations]: https://paypal.me/NeumannBenjamin
[brave]: https://brave.com/nai412
[contributing]: /CONTRIBUTING.md
