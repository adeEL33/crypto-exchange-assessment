import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./Form";
import Listing from "./Listing";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  //defining loading state
  const [loader, setLoader] = useState(false);
  const [exchanges,setExchanges] = useState([]);

  const fetchRecords = () => {
      handleLoading(true);
      axios.get('http://localhost:8080/api/crypto_exchange_record').then((res) => {
          if(res?.data?.status == 'success'){
              setExchanges(res?.data?.data);
          }
      }).catch((err) => {
          console.log(err);
      }).finally(() => handleLoading(false));
  }

  useEffect(() => {
      fetchRecords();
  },[])
  //set loader true or false
  const handleLoading = (isLoading) => {
    setLoader(isLoading);
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
        <Listing exchanges={exchanges} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
