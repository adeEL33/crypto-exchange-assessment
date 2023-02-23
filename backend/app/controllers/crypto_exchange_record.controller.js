const CrptoExchangeRecord = require("../models/crypto_exchange_record.model.js");
const coinRates = require('coin-rates');
const { make } = require('simple-body-validator');
// Create and Save a new CrptoExchangeRecord
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const rules = {
      currency_from: 'required|min:3',
      currency_to: 'required|min:3',
      amount_1: 'required|integer|min:1',
      amount_2: 'required|numeric|gt:0',
  };

  const validator = make(req.body, rules)
  if (! validator.validate()) {
      res.json({
        status: "error",
        msg: "Validation error",
        errors:validator.errors().all()
      })
      return;
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
    if (err){
      res.json({
        status: "error",
        msg: err.message || "Some error occurred while creating the CrptoExchangeRecord.",
        data:null
      })
      return;
    }
    else 
    {
      res.json({
        status: "success",
        msg: "data saved successfully",
        data:data
      })
      return;
    }
  });
};

// Retrieve all CrptoExchangeRecords from the database (with condition).
exports.findAll = (req, res) => {
  const date = req.query.date;
  const sort_type = req.query.sort_type;
  const sort_column = req.query.sort_column;
  const type = req.query.type;


  CrptoExchangeRecord.getAll(sort_type,sort_column,date,type, (err, data) => {
    if (err){
      res.json({
        status: "error",
        msg: err.message || "Some error occurred while creating the CrptoExchangeRecord.",
        data:null
      })
    }
    else{
      res.json({
        status: "success",
        msg: "data fetched successfully",
        data:data
      })
    }
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
