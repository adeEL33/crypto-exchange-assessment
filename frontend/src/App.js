import { useEffect, useState } from 'react';
import Form from "./Form";
import Listing from "./Listing";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  //defining loading state
  const [loader, setLoader] = useState(false);

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
        <Listing />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
