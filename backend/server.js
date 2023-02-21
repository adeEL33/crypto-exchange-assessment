const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();
const axios = require("axios");
const coinRates = require('coin-rates');
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// // simple route
app.get("/", (req, res) => {
  coinRates.get({
    provider: 'kraken',
    currencies: {
      from: 'ETH',
      to: 'USD',
    },
  }).then(rate => {
    console.log(rate);
  }).catch(error => {
    console.error(error);
  })
  res.json({ message: "Welcome to Crypto exchange application." });
});

require("./app/routes/crypto_exchange_record.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
