import React, { useState, useEffect } from "react";
import "./Table.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "./EditModal";


const TableDisplay = ({ selectedRows, setSelectedRows, searchInput, searchResults, overallData, filteredData }) => {
  const [data, setData] = useState([]);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
const [editedData, setEditedData] = useState({});
const [editingPatient, setEditingPatient] = useState(null);



  useEffect(() => {
    if (searchInput) {
      setData(searchResults);
    } else if (filteredData.length > 0) {
      setData(filteredData);
    } else {
      setData(overallData);
    }
  }, [searchInput, searchResults, overallData, filteredData]);
  

  const formatDateString = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    const [month, day, year] = formattedDate.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleRowSelect = (index) => {
    if (index === -1) {
      setSelectedRows(
        selectedRows.length === data.length
          ? []
          : [...Array(data.length).keys()]
      );
      setEditingRowIndex(null);
      if (index !== -1) {
        setEditedData(data[index]);
      }
    } else {
      if (selectedRows.includes(index)) {
        setSelectedRows(
          selectedRows.filter((selectedIndex) => selectedIndex !== index)
        );
        setEditingRowIndex(null);
      } else {
        setSelectedRows([...selectedRows, index]);
        setEditingRowIndex(null);
      }
    }
  };

  const handleSelectAll = () => {
    handleRowSelect(-1);
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    // Show the edit modal (you may use a state variable for this)
  };

  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients/${data[index]._id}`);
      if (response.status === 200) {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
      }
      toast("Patient Data deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th scope="col">Patient</th>
              <th scope="col">Study</th>
              <th scope="col">Study Date</th>
              <th scope="col">Ref.Physician</th>
              <th scope="col">Institution</th>
              <th scope="col">Assignment</th>
              <th scope="col">Status</th>
              <th scope="col">Upload Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </td>
                  <td>{user.patient}</td>
                  <td>{user.study}</td>
                  <td>{formatDateString(user.studyDate)}</td>
                  <td>{user.refPhysician}</td>
                  <td>{user.institution}</td>
                  <td>{user.assignment}</td>
                  <td className="status">{user.status}</td>
                  <td>{formatDateString(user.upload_date)}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn action-btn custom-dropdown-button"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></button>
                      <ul className="dropdown-menu">
                        <li>
                        <button className="btn dropdown-item" type="button" onClick={() => handleEdit(index)}>
                            Edit
                          </button>
                        </li>
                        <li>
                          <button className="btn dropdown-item" type="button" onClick={() => handleDelete(index)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <EditModal
        editingPatient={editingPatient}
        onClose={() => setEditingPatient(null)}
        onEditSuccess={() => {
          setEditingPatient(null);
        }}
      />
    </>
  );
};

export default TableDisplay;
