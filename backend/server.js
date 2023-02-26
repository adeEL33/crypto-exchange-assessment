const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const app = express();
const cronJob = require("./app/crons/create_records.js");
const http = require("http");
const socketIo = require("socket.io");
const CrptoExchangeRecord = require("./app/models/crypto_exchange_record.model.js");
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

//create reacrds after every spacified duration
cronJob.create();

// // simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Crypto exchange application." });
});

require("./app/routes/crypto_exchange_record.routes.js")(app);

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } }); // < Interesting!

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on('fetchExchangeRecords', (fromDate, toDate, sortType, sortColumn) => {
    CrptoExchangeRecord.getAll(sortType, sortColumn, fromDate, toDate, (err, data) => {
      if (err) {
        socket.emit('getData',[]);
      }
      else {
        socket.emit('getData',data);
      }
    });
    console.log('message: ' + fromDate, toDate, sortType, sortColumn);

  });



  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
