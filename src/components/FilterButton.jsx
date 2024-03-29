import React, { useState } from "react";
import axios from "axios";

const FilterButton = ({ onFilter, isFilterModalOpen, setFilterModalOpen }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromDate || !toDate) {
      console.error("Please provide both From and To dates");
      return;
    }

    onFilter(fromDate, toDate);  // Trigger the onFilter callback with date parameters
  };


  const handleReset = async () => {
    try {
      const response = await axios.get("https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients");
      onFilter(response.data);
      // Reset date inputs
      setFromDate("");
      setToDate("");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  return (
    <div className="mx-3">
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#filterModal"
        onClick={() => setFilterModalOpen(true)}
      >
        By Date
      </button>

      <div
        className={`modal fade ${isFilterModalOpen ? 'show' : ''}`}
        id="filterModal"
        tabIndex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden={!isFilterModalOpen}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="filterModalLabel">
                Filter Date
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <label htmlFor="from" className="col-12">
                    From
                  </label>
                  <input
                    className="col-12"
                    type="date"
                    name="from"
                    id="from"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </div>

                <div className="row my-3">
                  <label htmlFor="to" className="col-12">
                    To
                  </label>
                  <input
                    className="col-12"
                    type="date"
                    name="to"
                    id="to"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>
                <div className="row">
                  <button type="submit" className="btn col-12 mb-3">
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn col-12 mb-3"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterButton;
