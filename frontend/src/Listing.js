import "flatpickr/dist/themes/material_green.css";
import { useState } from "react";
import Flatpickr from "react-flatpickr";

function Listing({
  exchanges,
  setDateFilter,
  setToDateFilter,
  setSortTypeAndSortColumn,
  sortType,
  sortColumn,
}) {
  const [showModal,setShowModal] = useState(false)
  const [exchange,setExchange] = useState({})

  const singleExchnage = (singleExchnage) => {
    setExchange(singleExchnage);
    setShowModal(true);
  }
  return (
    <div className="card mt-5">
      <div className="card-header">
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>From Date</label>
              <Flatpickr
                className="form-control mt-2"
                onChange={([date]) => {
                  setDateFilter({ date });
                }}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label>To Date</label>
              <Flatpickr
                className="form-control mt-2"
                onChange={([date]) => {
                  setToDateFilter({ date });
                }}
              />
            </div>
          </div>
          {/* <div className="col-4">
            <div className="form-group">
              <label>Type Filter</label>
              <select
                onChange={(e) => setTypeFilter(e.target.value)}
                className="form-control mt-2"
              >
                <option value="">select</option>
                <option value="live_price">Live Price</option>
                <option value="exchanged">Exchanged</option>
              </select>
            </div>
          </div> */}
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive d-none d-sm-block">
          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>
                  <i
                    className="fas fa-sort-amount-down"
                    style={
                      sortType == "ASC" && sortColumn == "dated"
                        ? { color: "blue" }
                        : {}
                    }
                    onClick={() => setSortTypeAndSortColumn("ASC", "dated")}
                  ></i>{" "}
                  <i
                    className="fas fa-sort-amount-up"
                    style={
                      sortType == "DESC" && sortColumn == "dated"
                        ? { color: "blue" }
                        : {}
                    }
                    onClick={() => setSortTypeAndSortColumn("DESC", "dated")}
                  ></i>{" "}
                  Date & Time
                </th>
                <td>
                  <i
                    className="fas fa-sort-amount-down"
                    style={
                      sortType == "ASC" && sortColumn == "currency_from"
                        ? { color: "blue" }
                        : {}
                    }
                    onClick={() =>
                      setSortTypeAndSortColumn("ASC", "currency_from")
                    }
                  ></i>{" "}
                  <i
                    className="fas fa-sort-amount-up"
                    style={
                      sortType == "DESC" && sortColumn == "currency_from"
                        ? { color: "blue" }
                        : {}
                    }
                    onClick={() =>
                      setSortTypeAndSortColumn("DESC", "currency_from")
                    }
                  ></i>{" "}
                  Currency From
                </td>
                <td>
                  <i
                    className="fas fa-sort-amount-down"
                    style={
                      sortType == "ASC" && sortColumn == "amount_1"
                        ? { color: "blue" }
                        : {}
                    }
                    onClick={() => setSortTypeAndSortColumn("ASC", "amount_1")}
                  ></i>{" "}
                  <i
                    className="fas fa-sort-amount-up"
                    style={
                      sortType == "DESC" && sortColumn == "amount_1"
                        ? { color: "blue" }
                        : {}
                    }
                    onClick={() => setSortTypeAndSortColumn("DESC", "amount_1")}
                  ></i>{" "}
                  Amount 1
                </td>
                <td>
                  <i
                    className="fas fa-sort-amount-down"
                    onClick={() =>
                      setSortTypeAndSortColumn("ASC", "currency_to")
                    }
                    style={
                      sortType == "ASC" && sortColumn == "currency_to"
                        ? { color: "blue" }
                        : {}
                    }
                  ></i>{" "}
                  <i
                    className="fas fa-sort-amount-up"
                    onClick={() =>
                      setSortTypeAndSortColumn("DESC", "currency_to")
                    }
                    style={
                      sortType == "DESC" && sortColumn == "currency_to"
                        ? { color: "blue" }
                        : {}
                    }
                  ></i>{" "}
                  Currency To
                </td>
                <td>
                  <i
                    className="fas fa-sort-amount-down"
                    onClick={() => setSortTypeAndSortColumn("ASC", "amount_2")}
                    style={
                      sortType == "ASC" && sortColumn == "amount_2"
                        ? { color: "blue" }
                        : {}
                    }
                  ></i>{" "}
                  <i
                    className="fas fa-sort-amount-up"
                    onClick={() => setSortTypeAndSortColumn("DESC", "amount_2")}
                    style={
                      sortType == "DESC" && sortColumn == "amount_2"
                        ? { color: "blue" }
                        : {}
                    }
                  ></i>{" "}
                  Amount 2
                </td>
                <td>
                  <i
                    className="fas fa-sort-amount-down"
                    onClick={() => setSortTypeAndSortColumn("ASC", "type")}
                    style={
                      sortType == "ASC" && sortColumn == "type"
                        ? { color: "blue" }
                        : {}
                    }
                  ></i>{" "}
                  <i
                    className="fas fa-sort-amount-up"
                    onClick={() => setSortTypeAndSortColumn("DESC", "type")}
                    style={
                      sortType == "DESC" && sortColumn == "type"
                        ? { color: "blue" }
                        : {}
                    }
                  ></i>{" "}
                  Type
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan={6}></th>
              </tr>

              {exchanges?.length > 0 &&
                exchanges?.map((exchange, key) => {
                  return (
                    <tr key={key}>
                      <td>{exchange?.dated}</td>
                      <td>{exchange?.currency_from}</td>
                      <td>{exchange?.amount_1}</td>
                      <td>{exchange?.currency_to}</td>
                      <td>{exchange?.amount_2}</td>
                      <th
                        className={
                          exchange?.type == "live_price"
                            ? "text text-success"
                            : "text text-primary"
                        }
                      >
                        {exchange?.type == "live_price"
                          ? "Live Price"
                          : "Exchanged"}
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="d-block d-sm-none">
          {exchanges?.length > 0 &&
            exchanges?.map((exchange, key) => {
              return (
                <>
                  <div className="p-3 row bg-light" key={key} onClick={() => singleExchnage(exchange)}>
                    <div className="col-9">
                      {" "}
                      {exchange?.currency_from} ===> {exchange?.currency_to}{" "}
                      <br /> {exchange?.amount_2}{" "}
                    </div>
                    <div className="col-3">
                      <img
                        src={
                          exchange?.type == "live_price"
                            ? "./icons/pngs/green.png"
                            : "./icons/pngs/blue.png"
                        }
                        style={{ width: "10px" }}
                      />
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
        </div>
        <br />
        <br />
      </div>

      <div class={showModal ? "modal d-block d-sm-none" : "modal d-none"} tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Exchange</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() =>setShowModal(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger btn-block" onClick={() => setShowModal(false)}>
                close
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;
