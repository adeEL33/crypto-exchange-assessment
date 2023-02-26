module.exports = app => {
  const crypto_exchange_record = require("../controllers/crypto_exchange_record.controller.js");
  var router = require("express").Router();

  // Create a new CrptoExchangeRecord
  router.post("/", crypto_exchange_record.create);
  
  // Retrieve all CrptoExchangeRecords
  router.get("/", crypto_exchange_record.findAll);

  //exchange currency
  router.post("/exchange", crypto_exchange_record.exchange);

  app.use('/api/crypto_exchange_record', router);
};
