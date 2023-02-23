
function Listing({exchanges}) {
    
    return (
        <div className="card mt-5">
        <div className="card-body">

            <table className="table table-striped table-responsive">
    
                <tbody>
                    <tr>
                        <th>Date & Time</th>
                        <td>Currency From</td>
                        <td>Amount 1</td>
                        <td>Currency To</td>
                        <td>Amount 2</td>
                        <td>Type</td>
                    </tr>
                    
                        {
                            exchanges?.length > 0 && exchanges?.map((exchange,key) => {
                                return (
                                    <tr key={key}>
                                    <td>{exchange?.dated}</td>
                                    <td>{exchange?.currency_from}</td>
                                    <td>{exchange?.amount_1}</td>
                                    <td>{exchange?.currency_to}</td>
                                    <td>{exchange?.amount_2}</td>
                                    <td>{exchange?.type}</td>

                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
        </div>
    </div>
    );
  }
  
  export default Listing;
  