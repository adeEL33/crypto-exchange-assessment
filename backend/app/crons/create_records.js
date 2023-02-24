const CrptoExchangeRecord = require("../models/crypto_exchange_record.model.js");
var cron = require('node-cron');
const coinRates = require('coin-rates');
const currencies = [
    {
      'from':'BTC',
       'to':[
        'USD',
        'EUR',
        'GBP'
       ]
    },
    {
      'from':'ETH',
       'to':[
        'USD',
        'EUR',
        'GBP'
       ]
    }
];

exports.create = () => {
    //schedualling to get current rates
    cron.schedule('*/10 * * * *', () => {
        for(var i =0; i < currencies?.length; i++){
            let fromCurrency = currencies[i]?.from;
            for(var j =0; j < currencies[i]?.to?.length;j++){
                // console.log(fromCurrency +'running a task every two minutes '+currencies[i]?.to[j]);
                let toCurrency = currencies[i]?.to[j];
                coinRates.get({
                  provider: 'kraken',
                  currencies: {
                    from: fromCurrency,
                    to: toCurrency,
                  },
                }).then(rate => {
                  const amount1 = parseInt(Math.random() * 100);
                  const crypto_exchange_record = new CrptoExchangeRecord({
                    currency_from:fromCurrency,
                    currency_to:toCurrency,
                    amount_1:amount1,
                    amount_2:(rate*amount1),
                    type:'live_price',
                  });
      
                  // Save CrptoExchangeRecord in the database
                  CrptoExchangeRecord.create(crypto_exchange_record, (err, data) => {
                    // if (err)
                    //   console.log(err);
                    // else console.log(data);
                  });
                }).catch(error => {
                  console.error(error);
                })
            }
        }
    });
}