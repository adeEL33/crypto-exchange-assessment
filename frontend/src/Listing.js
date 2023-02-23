import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";

function Listing({ exchanges, setDateFilter, setTypeFilter }) {

    return (
        <div className="card mt-5">
            <div className="card-header">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Date Filter</label>
                            <Flatpickr
                                className="form-control mt-2"
                                onChange={
                                    ([date]) => {
                                        setDateFilter({ date });
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Type Filter</label>
                            <select onChange={
                                (e) => setTypeFilter(e.target.value)
                            } className="form-control mt-2">
                                <option value="">select</option>
                                <option value="live_price">Live Price</option>
                                <option value="exchanged">Exchanged</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div className="card-body">
                <div class="table-responsive d-none d-sm-block">
                    <table className="table table-striped table-responsive">
                        <thead>
                            <tr>
                                <th>Date & Time</th>
                                <td>Currency From</td>
                                <td>Amount 1</td>
                                <td>Currency To</td>
                                <td>Amount 2</td>
                                <td>Type</td>
                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <th colSpan={6}></th>
                            </tr>

                            {
                                exchanges?.length > 0 && exchanges?.map((exchange, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{exchange?.dated}</td>
                                            <td>{exchange?.currency_from}</td>
                                            <td>{exchange?.amount_1}</td>
                                            <td>{exchange?.currency_to}</td>
                                            <td>{exchange?.amount_2}</td>
                                            <th className={exchange?.type == 'live_price' ? 'text text-success' : 'text text-primary'}>{exchange?.type == 'live_price' ? 'Live Price' : 'Exchanged'}</th>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Listing;
