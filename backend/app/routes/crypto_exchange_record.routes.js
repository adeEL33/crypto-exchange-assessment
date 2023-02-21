module.exports = app => {
  const crypto_exchange_record = require("../controllers/crypto_exchange_record.controller.js");

  var router = require("express").Router();

  // Create a new CrptoExchangeRecord
  router.post("/", crypto_exchange_record.create);

  // Retrieve all CrptoExchangeRecords
  router.get("/", crypto_exchange_record.findAll);

  // Retrieve a single CrptoExchangeRecord with id
  router.get("/:id", crypto_exchange_record.findOne);

  // Update a CrptoExchangeRecord with id
  router.put("/:id", crypto_exchange_record.update);

  // Delete a CrptoExchangeRecord with id
  router.delete("/:id", crypto_exchange_record.delete);

  // Delete all CrptoExchangeRecords
  router.delete("/", crypto_exchange_record.deleteAll);
  router.post("/exchange", crypto_exchange_record.exchange);


  app.use('/api/crypto_exchange_record', router);
};
