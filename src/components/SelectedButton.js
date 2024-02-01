import React from "react";
import "./Table.css";

const SelectedButton = ({ selectedRows, onClick }) => {
  return (
    <div className="mx-3">
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#uploadModal"
        onClick={onClick}
        disabled={selectedRows.length === 0}
      >
        Selected ({selectedRows.length})
      </button>

      <div
        className="modal fade"
        id="uploadModal"
        tabIndex="-1"
        aria-labelledby="uploadModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              {/* <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      placeholder="Patient name"
                      // value={patient}
                      onChange={(e) => setPatient(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      placeholder="Study"
                      aria-label="Study"
                      // value={study}
                      onChange={(e) => setStudy(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="date"
                      placeholder="Study Date"
                      aria-label="Study Date"
                      // value={studyDate}
                      onChange={(e) => setStudyDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      placeholder="Ref Physician"
                      aria-label="Ref Physician"
                      // value={refPhysician}
                      onChange={(e) => setRefPhysician(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      placeholder="Institution"
                      aria-label="Institution"
                      // value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      placeholder="Assignment"
                      aria-label="Assignment"
                      // value={assignment}
                      onChange={(e) => setAssignment(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      placeholder="Status"
                      aria-label="Status"
                      // value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </form> */}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedButton;
