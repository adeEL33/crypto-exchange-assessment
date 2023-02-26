import "flatpickr/dist/themes/material_green.css";
import { useState } from "react";
import Flatpickr from "react-flatpickr";

//listing component with functions and states passed from parent component as props
function Listing({
    exchanges,//exchange records
    setDateFilter, //function to set from date filter
    setToDateFilter,//function to set to date filter
    setSortTypeAndSortColumn,//function to set sort type and sort column
    sortType,//sortType state
    sortColumn,//sort column state
}) {
    //defining and initializing modal state to show in mobile view
    const [showModal, setShowModal] = useState(false)
    //setting up single exchange record to show in modal in mobile view
    const [exchange, setExchange] = useState({})

    //function to set single exchange record
    const singleExchnage = (singleExchnage) => {
        setExchange(singleExchnage);
        setShowModal(true);
    }

    return (
        <div className="card mt-5">
            {/* available filters works on changing we could have a button for that also */}
            <div className="card-header">
                <h4>Filters</h4>
                <hr />
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
                {/* tabular view will not show on mobile screens */}
                <div className="table-responsive d-none d-sm-block">
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th>
                                    <i
                                        className="fas fa-sort-amount-down"
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "ASC" && sortColumn == "dated"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                        //on click seting the column and type of sorting
                                        onClick={() => setSortTypeAndSortColumn("ASC", "dated")}
                                    ></i>{" "}
                                    <i
                                        className="fas fa-sort-amount-up"
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "DESC" && sortColumn == "dated"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                        //on click seting the column and type of sorting
                                        onClick={() => setSortTypeAndSortColumn("DESC", "dated")}
                                    ></i>{" "}
                                    Date & Time
                                </th>
                                <td>
                                    <i
                                        className="fas fa-sort-amount-down"
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "ASC" && sortColumn == "currency_from"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                        //on click seting the column and type of sorting
                                        onClick={() =>
                                            setSortTypeAndSortColumn("ASC", "currency_from")
                                        }
                                    ></i>{" "}
                                    <i
                                        className="fas fa-sort-amount-up"
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "DESC" && sortColumn == "currency_from"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                        //on click seting the column and type of sorting
                                        onClick={() =>
                                            setSortTypeAndSortColumn("DESC", "currency_from")
                                        }
                                    ></i>{" "}
                                    Currency From
                                </td>
                                <td>
                                    <i
                                        className="fas fa-sort-amount-down"
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "ASC" && sortColumn == "amount_1"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                        onClick={() => setSortTypeAndSortColumn("ASC", "amount_1")}
                                    ></i>{" "}
                                    <i
                                        className="fas fa-sort-amount-up"
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "DESC" && sortColumn == "amount_1"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                        //on click seting the column and type of sorting
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
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "ASC" && sortColumn == "currency_to"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                    ></i>{" "}
                                    <i
                                        className="fas fa-sort-amount-up"
                                        //on click seting the column and type of sorting
                                        onClick={() =>
                                            setSortTypeAndSortColumn("DESC", "currency_to")
                                        }
                                        //highliting current sort type and sort column by checking 
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
                                        //on click seting the column and type of sorting
                                        onClick={() => setSortTypeAndSortColumn("ASC", "amount_2")}
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "ASC" && sortColumn == "amount_2"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                    ></i>{" "}
                                    <i
                                        className="fas fa-sort-amount-up"
                                        //on click seting the column and type of sorting
                                        onClick={() => setSortTypeAndSortColumn("DESC", "amount_2")}
                                        //highliting current sort type and sort column by checking 
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
                                        //on click seting the column and type of sorting
                                        onClick={() => setSortTypeAndSortColumn("ASC", "type")}
                                        //highliting current sort type and sort column by checking 
                                        style={
                                            sortType == "ASC" && sortColumn == "type"
                                                ? { color: "blue" }
                                                : {}
                                        }
                                    ></i>{" "}
                                    <i
                                        className="fas fa-sort-amount-up"
                                        //on click seting the column and type of sorting
                                        onClick={() => setSortTypeAndSortColumn("DESC", "type")}
                                        //highliting current sort type and sort column by checking 
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
                            {/* checking the length of records */}
                            {exchanges?.length > 0 &&
                            
                                exchanges?.map((exchange, key) => {
                                    {/* iterating through the records */}
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
                {/*this view will  show only  on mobile screens */}
                <div className="d-block d-sm-none">
                    {exchanges?.length > 0 &&
                        exchanges?.map((exchange, key) => {
                            return (
                                <>
                                {/* on click a modal will show up with detail of the single exchange record in mobile view */}
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
            {/* modal to show single record detail in mobile view */}
            <div className={showModal ? "modal d-block d-sm-none" : "modal d-none"} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Exchange</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <th>Date & Time</th>
                                    <td>{exchange?.dated}</td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td>{exchange?.type == "live_price" ? "Live Price" : "Exchanged"}
                                        <img
                                            src={
                                                exchange?.type == "live_price"
                                                    ? "./icons/pngs/green.png"
                                                    : "./icons/pngs/blue.png"
                                            }
                                            style={{ width: "25px" }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Date & Time</td>
                                    <td>{exchange?.dated}</td>
                                </tr>

                                <tr>
                                    <td>From</td>
                                    <td>{exchange?.currency_from}</td>
                                </tr>

                                <tr>
                                    <td>To</td>
                                    <td>{exchange?.currency_to}</td>
                                </tr>
                                <tr>
                                    <td>Amount</td>
                                    <td>{exchange?.amount_2 / exchange?.amount_1}</td>
                                </tr>

                                <tr>
                                    <td>Total Amount</td>
                                    <td>{exchange?.amount_2}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-block" onClick={() => setShowModal(false)}>
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
