import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import ErrorHandling from './ErrorHandling.js';
function Form({ handleLoading }) {
    const [state, setState] = useState({
        currency_from: '',
        currency_to: '',
        amount_1: 1,
        amount_2: 0,
        type: 'exchanged'
    });
    const [errors, setErrors] = useState(new ErrorHandling());
    const handleStateChange = (e) => {
        // console.log(e.target.name,e.target.value);
        setState({ ...state, [e.target.name]: e.target.value });
        
    }

    
    const handleSaveFormRecord = () => {
        handleLoading(true);
        axios.post('http://localhost:8080/api/crypto_exchange_record', state).then((res) => {
            if (res.data.status == 'success') {
                setState({
                    currency_from: '',
                    currency_to: '',
                    amount_1: 1,
                    amount_2: 0,
                    type: 'exchanged'
                })
                setErrors(new ErrorHandling())
                toast.success('Record is saved!')
            } else if (res.data.status == 'error') {
                console.log(res.data);
                if (res.data.errors) {
                    errors.record(res.data.errors);
                }
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => handleLoading(false))
    }

    const exchangeCurrency = () => {
        if (state?.currency_from != '' && state?.currency_to != "" ) {
            handleLoading(true);
            axios.post('http://localhost:8080/api/crypto_exchange_record/exchange', {
                'currency_from': state?.currency_from,
                'currency_to': state?.currency_to,
                'amount_1': state?.amount_1 == '' ? 1 : state?.amount_1
            }).then((res) => {
                if (res.data.status == 'success') {
                    setState({...state,amount_2: parseInt(state?.amount_1)*res.data.rate });
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => handleLoading(false))
        }
    }

    useEffect(() => {
        exchangeCurrency();
    },[state.currency_from,state.currency_to,state.amount_1])
    
    return (
        <div className="card">
            <div className="card-header bg-transparent">
                <h4>Exchange</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Currency From</label>

                            <select className="form-control" name="currency_from" onChange={handleStateChange}>
                                <option selected={state?.currency_from == ""} value="">select</option>
                                <option selected={state?.currency_from == "BTC"} value="BTC">BTC</option>
                                <option selected={state?.currency_from == "ETH"} value="ETH">ETH</option>
                            </select>
                            {
                                errors.has('currency_from') ? (
                                    <span
                                        className="help is-danger text-danger"
                                    >{errors?.get('currency_from')}</span>
                                ) : ''
                            }

                        </div>

                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="number" value={state?.amount_1} className="form-control" name="amount_1" onChange={handleStateChange} />
                            {
                                errors.has('amount_1') ? (
                                    <span
                                        className="help is-danger text-danger"
                                    >{errors?.get('amount_1')}</span>
                                ) : ''
                            }
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Currency To</label>
                            <select className="form-control" name="currency_to" onChange={handleStateChange}>
                                <option selected={state?.currency_from == ""} value="">select</option>
                                <option selected={state?.currency_from == "USD"} value="USD">USD</option>
                                <option selected={state?.currency_from == "EUR"} value="EUR">EUR</option>
                                <option selected={state?.currency_from == "GBP"} value="GBP">GBP</option>
                            </select>
                            {
                                errors.has('currency_to') ? (
                                    <span
                                        className="help is-danger text-danger"
                                    >{errors?.get('currency_to')}</span>
                                ) : ''
                            }
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="number" value={state?.amount_2} className="form-control" name="amount_2" onChange={handleStateChange} />
                            {
                                errors.has('amount_2') ? (
                                    <span
                                        className="help is-danger text-danger"
                                    >{errors?.get('amount_2')}</span>
                                ) : ''
                            }
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-12">
                        <div className="d-grid gap-2">
                            <button onClick={handleSaveFormRecord} className="btn btn-success btn-block mt-4">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
