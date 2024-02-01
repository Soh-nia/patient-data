import React, { useState, useEffect } from "react";
import "./Table.css";
import TableDisplay from "./TableDisplay";
import SelectedButton from "./SelectedButton";
import FilterButton from "./FilterButton";
import RunButton from "./RunButton";
import SearchBar from "./SearchBar";
import UploadButton from "./UploadButton";
import axios from "axios";


const Table = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [overallData, setOverallData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients");
      setOverallData(response.data);
    } catch (error) {
      console.error("Error fetching overall data:", error);
    }
  };

  const handleSelectedAction = () => {
    // Perform the action based on selectedRows
    console.log("Selected Rows:", selectedRows);
    setSelectedRows([]);
  };

  const handleSearch = (input, results) => {
    setSearchInput(input);
    setSearchResults(results);
  };

  const handleFilter = async (fromDate, toDate) => {
    try {
      const response = await axios.get("https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients/filter", {
        params: {
          fromDate,
          toDate,
        },
      });
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div className="container-fluid d-flex align-item-center">
            <div className="d-flex align-item-center">
              <SelectedButton
                selectedRows={selectedRows}
                onClick={() => handleSelectedAction()}
              />
              <FilterButton onFilter={handleFilter} />
              <RunButton />
            </div>

            <div className="d-flex align-item-center">
              <SearchBar onSearch={handleSearch} />
              <UploadButton />
            </div>
          </div>
        </nav>

        <TableDisplay
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          searchInput={searchInput}
          searchResults={searchResults}
          overallData={overallData}
          filteredData={filteredData}
        />
      </div>
    </>
  );
};

export default Table;
