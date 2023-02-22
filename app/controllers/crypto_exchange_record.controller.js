const CrptoExchangeRecord = require("../models/crypto_exchange_record.model.js");
const coinRates = require('coin-rates');

// Create and Save a new CrptoExchangeRecord
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a CrptoExchangeRecord
  const crypto_exchange_record = new CrptoExchangeRecord({
    currency_from:req.body.currency_from,
    currency_to:req.body.currency_to,
    amount_1:req.body.amount_1,
    amount_2:req.body.amount_2,
    type:req.body.type,
  });

  // Save CrptoExchangeRecord in the database
  CrptoExchangeRecord.create(crypto_exchange_record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CrptoExchangeRecord."
      });
    else res.send(data);
  });
};

// Retrieve all CrptoExchangeRecords from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  CrptoExchangeRecord.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving crypto_exchange_records."
      });
    else res.send(data);
  });
};

// exchange currency from coinapi
exports.exchange = (req, res) => {
  console.log(req.body);
  const { currency_from, currency_to } = req.body;
  if (!currency_from) {
    res.json({
      status: "error",
      msg: "Currency From Field is required"
    })
  }
  else if (!currency_to) {
    res.json({
      status: "error",
      msg: "currency To Field is required"
    })
  } else {
    coinRates.get({
      provider: 'kraken',
      currencies: {
        from: currency_from,
        to: currency_to,
      },
    }).then(rate => {
      res.json({
        status: "success",
        msg: "data fetched successfully",
        rate:rate
      })
    }).catch(error => {
      console.error(error);
    })
  }
  
};
