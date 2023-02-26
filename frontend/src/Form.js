import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import ErrorHandling from './ErrorHandling.js';

//Form funtion with props from parent component
function Form({ handleLoading,fetchRecords }) {
    //defining and initializing  states using usestate hook
    const [state, setState] = useState({
        currency_from: '',
        currency_to: '',
        amount_1: 1,
        amount_2: 0,
        type: 'exchanged'
    });
    //we are using errorhandling class for for hadnling exceptions errors
    const [errors, setErrors] = useState(new ErrorHandling());

    //function to set input states
    const handleStateChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });   
    }

    //function to save data to database by calling backend api using axios
    const handleSaveFormRecord = () => {
        //setting loader to true
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
                //set errors to initial state
                setErrors(new ErrorHandling())
                //fetch previous and new records
                fetchRecords();
                //show success notification
                toast.success('Record is saved!')

            } else if (res.data.status == 'error') {
                //checking if there is any error
                if (res.data.errors) {
                    //putting errors to error state by calling ErrorHandling class funciton
                    errors.record(res.data.errors);
                }
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => handleLoading(false)) //seting loader to false
    }

    //exchnage coin to currency rate
    const exchangeCurrency = () => {
        //check if from currency and to currency state is not empty
        if (state?.currency_from != '' && state?.currency_to != "" ) {
            //setting loader to true
            handleLoading(true);
            //calling backend api to exchange currency rate
            axios.post('http://localhost:8080/api/crypto_exchange_record/exchange', {
                'currency_from': state?.currency_from,
                'currency_to': state?.currency_to,
                'amount_1': state?.amount_1 == '' ? 1 : state?.amount_1
            }).then((res) => {
                //checking if status is success
                if (res.data.status == 'success') {
                    //settting current rate of coin and multiplying with amount 1
                    setState({...state,amount_2: parseInt(state?.amount_1)*res.data.rate });
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => handleLoading(false)) //setting loader to false
        }
    }

    useEffect(() => {
        //calling function onload and if any dependent state value is changed
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
                            {/* currency form lable */}
                            <label>Currency From</label>
                             {/* currency form select with options */}
                            <select className="form-control" name="currency_from" onChange={handleStateChange}>
                                <option selected={state?.currency_from == ""} value="">select</option>
                                <option selected={state?.currency_from == "BTC"} value="BTC">BTC</option>
                                <option selected={state?.currency_from == "ETH"} value="ETH">ETH</option>
                            </select>
                            {/* checking if there is any validation error and displaying it by pass error key */}
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
                             {/* Amount 1 lable */}
                            <label>Amount 1</label>
                             {/* Amount 1 input */}
                            <input type="number" value={state?.amount_1} className="form-control" name="amount_1" onChange={handleStateChange} />
                            {/* checking if there is any validation error and displaying it by pass error key */}
                            
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
                            {/* checking if there is any validation error and displaying it by pass error key */}
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
                            {/* checking if there is any validation error and displaying it by pass error key */}
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
                            {/* button to send request to backend to save data */}
                            <button onClick={handleSaveFormRecord} className="btn btn-success btn-block mt-4">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;
