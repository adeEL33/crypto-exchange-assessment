const CrptoExchangeRecord = require("../models/crypto_exchange_record.model.js");
const axios = require("axios");
// Create and Save a new CrptoExchangeRecord
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a CrptoExchangeRecord
  const tutorial = new CrptoExchangeRecord({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save CrptoExchangeRecord in the database
  CrptoExchangeRecord.create(tutorial, (err, data) => {
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
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single CrptoExchangeRecord by Id
exports.findOne = (req, res) => {
  CrptoExchangeRecord.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CrptoExchangeRecord with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving CrptoExchangeRecord with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a CrptoExchangeRecord identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  CrptoExchangeRecord.updateById(
    req.params.id,
    new CrptoExchangeRecord(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found CrptoExchangeRecord with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating CrptoExchangeRecord with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a CrptoExchangeRecord with the specified id in the request
exports.delete = (req, res) => {
  CrptoExchangeRecord.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found CrptoExchangeRecord with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete CrptoExchangeRecord with id " + req.params.id
        });
      }
    } else res.send({ message: `CrptoExchangeRecord was deleted successfully!` });
  });
};

// Delete all CrptoExchangeRecords from the database.
exports.deleteAll = (req, res) => {
  CrptoExchangeRecord.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All CrptoExchangeRecords were deleted successfully!` });
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
    axios.get('https://rest.coinapi.io/v1/exchangerate/'+currency_from+'/'+currency_to, {
      headers: { 'X-CoinAPI-Key': '1BEC3CED-2E5B-482B-888F-BA647405F66F' }
    }).then(response => {
      try{
        res.json({ status: "success", res:JSON.stringify(response.data) });

      }catch(err){
        console.log(err);
        res.json({ status: "err", res:JSON.stringify(err) });


      }
    })
  }
  
};
