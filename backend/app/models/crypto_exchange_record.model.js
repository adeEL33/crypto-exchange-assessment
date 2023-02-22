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

    console.log("created crypto_exchange_record: ", { id: res.insertId, ...newCrptoExchangeRecord });
    result(null, { id: res.insertId, ...newCrptoExchangeRecord });
  });
};

CrptoExchangeRecord.findById = (id, result) => {
  sql.query(`SELECT * FROM crypto_exchange_records WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found crypto_exchange_record: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found CrptoExchangeRecord with the id
    result({ kind: "not_found" }, null);
  });
};

CrptoExchangeRecord.getAll = (title, result) => {
  let query = "SELECT * FROM crypto_exchange_records";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("crypto_exchange_records: ", res);
    result(null, res);
  });
};

CrptoExchangeRecord.getAllPublished = result => {
  sql.query("SELECT * FROM crypto_exchange_records WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("crypto_exchange_records: ", res);
    result(null, res);
  });
};

CrptoExchangeRecord.updateById = (id, crypto_exchange_record, result) => {
  sql.query(
    "UPDATE crypto_exchange_records SET title = ?, description = ?, published = ? WHERE id = ?",
    [crypto_exchange_record.title, crypto_exchange_record.description, crypto_exchange_record.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found CrptoExchangeRecord with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated crypto_exchange_record: ", { id: id, ...crypto_exchange_record });
      result(null, { id: id, ...crypto_exchange_record });
    }
  );
};

CrptoExchangeRecord.remove = (id, result) => {
  sql.query("DELETE FROM crypto_exchange_records WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found CrptoExchangeRecord with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted crypto_exchange_record with id: ", id);
    result(null, res);
  });
};

CrptoExchangeRecord.removeAll = result => {
  sql.query("DELETE FROM crypto_exchange_records", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} crypto_exchange_records`);
    result(null, res);
  });
};

module.exports = CrptoExchangeRecord;
