import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./Form";
import Listing from "./Listing";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  //defining loading state
  const [loader, setLoader] = useState(false);
  const [exchanges, setExchanges] = useState([]);
  const [sortType, setSortType] = useState('DESC');
  const [sortColumn, setSortColumn] = useState('id');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');



  const fetchRecords = () => {
    handleLoading(true);
    axios.get('http://localhost:8080/api/crypto_exchange_record?sort_type=' + sortType + '&sort_column=' + sortColumn + '&date=' + date + '&type=' + type).then((res) => {
      if (res?.data?.status == 'success') {
        setExchanges(res?.data?.data);
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => handleLoading(false));
  }
  const setDateFilter = (dateObject) => {
    console.log(dateObject);
    setDate(dateformate(dateObject?.date));
  }
  const setTypeFilter = (typeFilter) => {
    setType(typeFilter);
  }
  useEffect(() => {
    fetchRecords();
  }, [date, type])
  //set loader true or false
  const handleLoading = (isLoading) => {
    setLoader(isLoading);
  }

  const dateformate = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if (month < 10)
      month = "0" + month;
    if (minutes < 10)
      minutes = "0" + minutes;
    if (day < 10)
      day = "0" + day;
    if (hour < 10)
      hour = "0" + hour;

    return year + "-" + month + "-" + day;
  }

  return (
    <div >
      {

        loader ? (<div id="backdrop">
          <div className="text-center loading">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>) : ''

      }

      <div className="container mt-5">

        <Form handleLoading={handleLoading} />
        <Listing exchanges={exchanges} date={date} setDateFilter={setDateFilter} setTypeFilter={setTypeFilter} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
