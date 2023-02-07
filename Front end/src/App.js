import React, { useState, useEffect } from 'react';
import './App.css';
import SortButton from './SortButton';
import SortButtonFilter from './SortButtonFilter';
import PopUp from './PopUp';



const App = () => {
  const [students, setStudents] = useState([]);

  const updateTable = () => {
    fetch('http://localhost:8080/students?colNumber='+sortOrder.col+'&sortOrder='+sortOrder.order+'&firstName='+
    filterInput.firstName+'&lastName='+filterInput.lastName+'&department='+filterInput.department)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    updateTable();
  }, []);

  const [sortOrder, setSortOrder] = useState({ col: -1, order: ""});

  const handleSortOrderChange = (col, newSortOrder) => {
    setSortOrder({ col, order: newSortOrder }, updateTable);
  };


  const [filterInput, setFilterInput] = useState({ firstName: "", lastName: "", department: "" });
  
  const handleFilterInput = (col, input) => {
    if (col == 1)
      setFilterInput({ ...filterInput, firstName: input });
    if (col == 2)
      setFilterInput({ ...filterInput, lastName: input});
    if (col == 4)
      setFilterInput({ ...filterInput, department: input });
  };

  useEffect(() => {
    updateTable();
  }, [filterInput, sortOrder]);
  
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = students.slice(startIndex, endIndex);
  const isLastPage = endIndex >= students.length;
  const isFirstPage = currentPage === 1;

  const [popupState, setPopupState] = useState({
    showPopUp: false,
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });
  
  const handleModify = (id, firstName, lastName, email, department) => {    
    if (popupState.showPopUp != true){
      setPopupState({showPopUp: true,
        id,
        firstName,
        lastName,
        email,
        department
      }, updateTable);
  }
  };

  const handleAdd = () => {
    if (popupState.showPopUp != true){
      setPopupState({
        showPopUp: true,
        id: -1,
        firstName: '',
        lastName: '',
        email: '',
        department: ''
      }, updateTable);
  }
    };

const handleClosePopUp = () => {
  setPopupState({...popupState, showPopUp: false });
  updateTable();
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Students Manager</h1>
        <div>
      <button class="btn"
        disabled={isFirstPage}
        onClick={() => setCurrentPage(currentPage - 1)}
        style={{ backgroundColor: isFirstPage ? "#ccc" : "green" }}
      >
        Back
      </button>
      <span>Page {currentPage}</span>
      <button class="btn"
        disabled={isLastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
        style={{ backgroundColor: isLastPage ? "#ccc" : "blue" }}
      >
        Next
      </button>
      </div>
      <button onClick={() => 
      handleAdd()
      }>Add Student</button>
      <PopUp
      showPopUp={popupState.showPopUp}
      handleClosePopUp={handleClosePopUp}
      id={popupState.id}
      firstName={popupState.firstName}
      lastName={popupState.lastName}
      email={popupState.email}
      department={popupState.department}
      />
        <table>
          <thead>
            <tr>
              <th>
                ID
                <SortButton
                  col={0}
                  sortOrder={sortOrder}
                  onSortOrderChange={handleSortOrderChange}
                />
              </th>
              <th>
                First Name
                <SortButtonFilter
                  col={1}
                  sortOrder={sortOrder}
                  onSortOrderChange={handleSortOrderChange}
                  onFilterInput={handleFilterInput}
                />
              </th>
              <th>
                Last Name
                <SortButtonFilter
                  col={2}
                  sortOrder={sortOrder}
                  onSortOrderChange={handleSortOrderChange}
                  onFilterInput={handleFilterInput}
                />
              </th>
              <th>
                Email
                <SortButton
                  col={3}
                  sortOrder={sortOrder}
                  onSortOrderChange={handleSortOrderChange}
                />
              </th>
              <th>
                Department
                <SortButtonFilter
                  col={4}
                  sortOrder={sortOrder}
                  onSortOrderChange={handleSortOrderChange}
                  onFilterInput={handleFilterInput}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length ? (
              paginatedData.map(item => (
                <tr
                  key={item.id}
                  onClick={() => handleModify(item.id, item.firstName, item.lastName, item.email, item.department)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No results
                </td>
              </tr>
            )}
        </tbody>
        </table>
      </header>
    </div>
  );
};

export default App;
