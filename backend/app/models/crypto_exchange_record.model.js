const sql = require("./db.js");

// constructor
const CrptoExchangeRecord = function(crypto_exchange_record) {
  this.currency_from = crypto_exchange_record.currency_from;
  this.currency_to = crypto_exchange_record.currency_to;
  this.amount_1 = crypto_exchange_record.amount_1;
  this.amount_2 = crypto_exchange_record.amount_2;
  this.type = crypto_exchange_record.type;

};

CrptoExchangeRecord.create = (newCrptoExchangeRecord, result) => {
  sql.query("INSERT INTO crypto_exchange_records SET ?", newCrptoExchangeRecord, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created crypto_exchange_record: ", { id: res.insertId, ...newCrptoExchangeRecord });
    result(null, { id: res.insertId, ...newCrptoExchangeRecord });
  });
};

CrptoExchangeRecord.getAll = (sort_type,sort_column,date,to_date, result) => {
  let query = "SELECT * FROM crypto_exchange_records";
  
  
  if (date && to_date){
    
    query += ` WHERE DATE_FORMAT(dated,'%Y-%m-%d') >= '${date}' `;
    query += ' AND ';
    query += ` DATE_FORMAT(dated,'%Y-%m-%d') <= '${to_date}' `;
  }
  
  if(sort_type && sort_column){
    query += ` ORDER BY ${sort_column} ${sort_type}`;
  }
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("crypto_exchange_records: ", res);
    result(null, res);
  });
};

module.exports = CrptoExchangeRecord;
