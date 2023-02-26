import { useEffect, useState } from "react";
//importing child components
import Form from "./Form";
import Listing from "./Listing";
//toaster to show notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//socket io client to intract with server
import socketIOClient from "socket.io-client";

function App() {
  //defining loading state
  const [loader, setLoader] = useState(false);
  //defining loading state
  const [exchanges, setExchanges] = useState([]);
  //defining sortType state
  const [sortType, setSortType] = useState("DESC");
  //defining sortColumn state
  const [sortColumn, setSortColumn] = useState("id");
  //defining fromDate state
  const [date, setDate] = useState("");
  //defining toDate state
  const [toDate, setToDate] = useState("");

  //retrive records from database using socketioclient
  const fetchRecords = () => {
    //telling socketioclient to intract with server at given url
    const socket = socketIOClient("http://localhost:8080");
    //emiting fetchExchangeRecords 
    socket.emit("fetchExchangeRecords", date, toDate, sortType, sortColumn);
    //setting up loader to true
    setLoader(true);
    socket.on('getData', (data) => {
      //setting exhanges data
      setExchanges(data);
      //setting loader to false
      setLoader(false);
    })
  };

  //from date filter function
  const setDateFilter = (dateObject) => {
    setDate(dateformate(dateObject?.date));
  };

  //to date filter function
  const setToDateFilter = (toDate) => {
    setToDate(dateformate(toDate?.date));
  };

  //set loader true or false
  const handleLoading = (isLoading) => {
    setLoader(isLoading);
  };

  //setting sorting type and column function
  const setSortTypeAndSortColumn = (sort_type, sort_olumn) => {
    setSortColumn(sort_olumn);
    setSortType(sort_type);
  };

  //date formating funciton
  const dateformate = (date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if (month < 10) month = "0" + month;
    if (minutes < 10) minutes = "0" + minutes;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;

    return year + "-" + month + "-" + day;
  };

  //calling fetchRecords on load and on any change in dependent states
  useEffect(() => {
    fetchRecords();
  }, [date, toDate, sortType, sortColumn]);

  return (
    <div>
      {/* showing loader if loader state is true */}
      {loader ? (
        <div id="backdrop">
          <div className="text-center loading">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="container mt-5">
        {/* Form Component to create new records and passing functions handleLoading,fetchRecords as props*/}
        <Form handleLoading={handleLoading} fetchRecords={fetchRecords} />
        {/* Listing Component for displaying data and passing functions an states as props*/}
        <Listing
          setSortTypeAndSortColumn={setSortTypeAndSortColumn}
          exchanges={exchanges}
          date={date}
          setDateFilter={setDateFilter}
          setToDateFilter={setToDateFilter}
          sortColumn={sortColumn}
          sortType={sortType}
        />
      </div>
     {/* toaster component for notification */}
      <ToastContainer />
    </div>
  );
}

export default App;
