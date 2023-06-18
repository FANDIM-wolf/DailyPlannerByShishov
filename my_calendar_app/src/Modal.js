import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";
import { useParams } from 'react-router-dom';
export default function Modal() {
  const [modal, setModal] = useState(false);

  const [text, setFormData] = useState("Enter your thoughts here.");
  const { year, month, day } = useParams();

  // Function to convert month name to number
  const convertMonthNameToNumber = (monthName) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthNumber = monthNames.indexOf(monthName) + 1;
    return monthNumber;
  };

  function sendData(){
   
    const monthNumber = convertMonthNameToNumber(month); // Convert month name to number
    axios.post('http://localhost:8000/api/notes', {
      text: text,
      day: day,
      month: monthNumber,
      year: year
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
   }

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Add information
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>What information are you going to add?</h2>
            <textarea 
                name="formData"  
                value={text}
                onChange={e => setFormData(e.target.value)}
            />
            <br/>
         
            <button type="submit" onClick={sendData}>Send Data</button>  
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}