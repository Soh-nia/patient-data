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
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients"
      );
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
    const formatDateToISOString = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}T00:00:00.000Z`;
    };

    const formattedFromDate = formatDateToISOString(new Date(fromDate));
    const formattedToDate = formatDateToISOString(new Date(toDate));

    try {
      const response = await axios.get(
        "https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients/filter",
        {
          params: {
            fromDate: formattedFromDate,
            toDate: formattedToDate,
          },
        }
      );
      setFilteredData(response.data);
      setFilterModalOpen(false);
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
              <FilterButton
                onFilter={handleFilter}
                isFilterModalOpen={isFilterModalOpen}
                setFilterModalOpen={setFilterModalOpen}
              />
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
