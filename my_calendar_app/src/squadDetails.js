import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Modal from  './Modal';

const SquadDetails = () => {
  const { year, month, day } = useParams();
  const [size, setSize] = useState(400);  
  const [clicked, setClicked] = useState(false);
  const [notes, setNotes] = useState([]);
  const [files, setFiles] = useState([]);
    // Function to convert month name to number
    const convertMonthNameToNumber = (monthName) => {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
  
      const monthNumber = monthNames.indexOf(monthName) + 1;
      return monthNumber;
    };
    function changeSize() {  
      setClicked(prev => !prev); 
     if(clicked == true){
       setSize(size => size + 50);  
     }
     else{
       setSize(size => size - 50);  
     }
   }
  useEffect(() => {
    const monthNumber = convertMonthNameToNumber(month); // Convert month name to number
    // Function to fetch notes
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/notes/${year}/${monthNumber}/${day}`);
        setNotes(response.data);
        
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    // Function to fetch files
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/files/${year}/${monthNumber}/${day}/`);
        setFiles(response.data);
        console.log(response.data);
        for( let i = 0 ; i < response.data.length; i++){

          //trim data in field image
          console.log(response.data[i].file);
          const txt = response.data[i].file ;
          const myArray = txt.split("/");
          console.log(myArray[1]);
          response.data[i].file = myArray[1];
          console.log(response.data[0].file);
        }
        
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };
    
   
    // Call the fetch functions
    fetchNotes();
    fetchFiles();
  }, [year, month, day]);

  return (
    <div class="container">
      
      <p>Date: {year}-{month}-{day}</p>
      {/* Other details and components related to squad */}
     

    <Modal />
      {/* Render the notes and files */}
      <h2>Notes:</h2>
      {notes.map((note) => (
        <div key={note.id}>{note.text}</div>
      ))}

      <h2>Files:</h2>
      {files.map((file) => (
        <div key={file.id}>
          <p>{file.file_name}</p>
          <img style={{ width: size + 'px', height: size + 'px' }}  onClick={changeSize}   src={`http://localhost:8000/api/files/${file.file}/download `} alt={file.file_name} />
          
        </div>
      ))}
    </div>
  );
};

export default SquadDetails;