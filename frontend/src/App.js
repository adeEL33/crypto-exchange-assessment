function App() {
  return (
    <div >
      <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-transparent">
                <h4>Exchange</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Currency From</label>
                            
                            <select class="form-control">
                                <option data-icon="<img src='icons/pngs/ADA.png'  />">   BTC
                                </option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Amount</label>
                            <input type="number" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Currency To</label>
                            <select class="form-control">
                                <option>BTC</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-12">
                        <div class="form-group">
                            <label>Amount</label>
                            <input type="number" class="form-control"/>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-12">
                        <div class="d-grid gap-2">
                            <button class="btn btn-success btn-block mt-4">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-5">
            <div class="card-body">

                <table class="table table-striped table-responsive">
        
                    <tbody>
                        <tr>
                            <th>Date & Time</th>
                            <td>Currency From</td>
                            <td>Amount 1</td>
                            <td>Currency To</td>
                            <td>Amount 2</td>
                            <td>Type</td>
                        </tr>
                        <tr>
                            <td>Date & Time</td>
                            <td>Currency From</td>
                            <td>Amount 1</td>
                            <td>Currency To</td>
                            <td>Amount 2</td>
                            <td>Type</td>
                        </tr>
                        <tr>
                            <td>Date & Time</td>
                            <td>Currency From</td>
                            <td>Amount 1</td>
                            <td>Currency To</td>
                            <td>Amount 2</td>
                            <td>Type</td>
                        </tr>
                        <tr>
                            <td>Date & Time</td>
                            <td>Currency From</td>
                            <td>Amount 1</td>
                            <td>Currency To</td>
                            <td>Amount 2</td>
                            <td>Type</td>
                        </tr>
                        <tr>
                            <td>Date & Time</td>
                            <td>Currency From</td>
                            <td>Amount 1</td>
                            <td>Currency To</td>
                            <td>Amount 2</td>
                            <td>Type</td>
                        </tr>
                        <tr>
                            <td>Date & Time</td>
                            <td>Currency From</td>
                            <td>Amount 1</td>
                            <td>Currency To</td>
                            <td>Amount 2</td>
                            <td>Type</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
</div>
    </div>
  );
}

export default App;
