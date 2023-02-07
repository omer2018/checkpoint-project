import React, { useState } from 'react';
import './PopUp.css';
import { useEffect } from 'react';


const PopUp = (props) => {
    const [id, setID] = useState(props.id);
    const [firstName, setFirstName] = useState(props.firstName );
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [department, setDepartment] = useState(props.department);

    const handleClose = () => {
      props.handleClosePopUp();
      setErrors([]);
    };
  
    useEffect(() => {
        setID(props.id);
        setFirstName(props.firstName);
        setLastName(props.lastName);
        setEmail(props.email);
        setDepartment(props.department);
    }, [props]);

    const departments = ['HR', 'Accounting', 'Sales'];


    const [errors, setErrors] = useState([]);

    function validateForm(firstName, lastName, email, department) {
        let errorMessages = [];
      
        if (!firstName) {
          errorMessages.push("First name is required");
        }
        if (!lastName) {
          errorMessages.push("Last name is required");
        }
        if (!email) {
          errorMessages.push("Email is required");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errorMessages.push("Invalid email format");
        }
        if (!department) {
          errorMessages.push("Department is required");
        } else if (!departments.includes(department)) {
          errorMessages.push("Invalid department");
        }
      
        return errorMessages;
      }

      
    const handleAdd = () => {
        const errs=validateForm(firstName, lastName, email, department);
        setErrors(errs);
        if(errs.length == 0 && id == -1){
            fetch('http://localhost:8080/add_student?firstName='+
        firstName+'&lastName='+lastName+'&email='+email+'&department='+department);
        setErrors(['Sucessfully added']);
        }
        else if(errs.length == 0){
            fetch('http://localhost:8080/update_student?id='+
            id+'&firstName='+
        firstName+'&lastName='+lastName+'&email='+email+'&department='+department);
        setErrors(['Sucessfully updated']);
        }
    };
  
    return (
        <div>
        {props.showPopUp && (
          <div className="popUpContainer">
            <div className="header" >
            <h3 className="title" >{id === -1 ? 'Add Student' : 'Update Student'}</h3>
              <button onClick={handleClose} className="closeButton">
                X
              </button>
            </div>  
          <div className="inputContainer">
            <div className="input">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <label>Department:</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                >
                <option value="">Select a department</option>
                {departments.map((d, index) => (
                    <option key={index} value={d}>
                    {d}
                    </option>
                ))}
                </select>
            </div>
          </div>
          <button onClick={handleAdd} className="addButton">
          {id === -1 ? 'Add' : 'Update'}
          </button>
          {errors.length > 0 && (
        <div>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
        </div>
      )}
    </div>
  );
};

export default PopUp;

