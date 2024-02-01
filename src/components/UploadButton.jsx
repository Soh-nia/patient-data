import React, { useState } from "react";
import "./Table.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadButton = () => {
  const [patient, setPatient] = useState("");
  const [study, setStudy] = useState("");
  const [studyDate, setStudyDate] = useState("");
  const [refPhysician, setRefPhysician] = useState("");
  const [institution, setInstitution] = useState("");
  const [assignment, setAssignment] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients", {
        patient: patient,
        study: study,
        studyDate,
        refPhysician: refPhysician,
        institution: institution,
        assignment: assignment,
        // status: status,
      });
      toast("Form submitted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="upload-data mx-2">
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Upload
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Upload Patient Data
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
                <div className="row g-2 my-3">
                  <div className="col-6 mb-3">
                    <label htmlFor="patient_name">Patient Name</label>
                    <input
                      type="text"
                      name="patient_name"
                      id="patient_name"
                      placeholder="Patient name"
                      value={patient}
                      onChange={(e) => setPatient(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="study">Study</label>
                    <input
                      type="text"
                      name="study"
                      id="study"
                      placeholder="Study"
                      aria-label="Study"
                      value={study}
                      onChange={(e) => setStudy(e.target.value)}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="study_date" className="col-12">
                      Study Date
                    </label>
                    <input
                      className="col-12"
                      type="date"
                      name="study_date"
                      id="study_date"
                      placeholder="Study Date"
                      aria-label="Study Date"
                      value={studyDate}
                      onChange={(e) => setStudyDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label htmlFor="ref_physician">Ref Physician</label>
                    <input
                      type="text"
                      name="ref_physician"
                      id="ref_physician"
                      placeholder="Ref Physician"
                      aria-label="Ref Physician"
                      value={refPhysician}
                      onChange={(e) => setRefPhysician(e.target.value)}
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label htmlFor="institution">Institution</label>
                    <input
                      type="text"
                      name="institution"
                      id="institution"
                      placeholder="Institution"
                      aria-label="Institution"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label htmlFor="assignment">Assignment</label>
                    <input
                      type="email"
                      name="assignment"
                      id="assignment"
                      placeholder="jjc@hospital2.com"
                      aria-label="Assignment"
                      value={assignment}
                      onChange={(e) => setAssignment(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label htmlFor="status">Status</label>
                    <input
                      type="text"
                      name="status"
                      id="status"
                      placeholder="Status"
                      aria-label="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <button type="submit" className="btn col-12">
                    Upload
                  </button>
                </div>
              </form>
            </div>
            {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadButton;
