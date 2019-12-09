require = require('esm')(module/*, options */)
const program = require('commander')
const createQuery = require('./index.js').createQuery
// createQuery('AEBTC').then(console.log).catch(console.log)

program
  .command('ask-rate <currency>')
  .description('Ask rate from binance using Oracle')
  .action(async (...arguments) => {
      try {
        const result = await createQuery(arguments[0])
        console.log(`Rate for ${arguments[0]} -> ${result}`)
      } catch(e) {
          console.log('Your query is not processed!')
      } 
    })

  // Handle unknown command's
program.on('command:*', () => program.help())

// Parse arguments or show `help` if argument's is empty
program.parse(process.argv)
if (program.args.length === 0) program.help()
