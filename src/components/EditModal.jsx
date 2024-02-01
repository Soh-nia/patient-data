import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditModal = ({ editingPatient, onClose, onEditSuccess }) => {
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (editingPatient) {
      setEditedData({
        patient: editingPatient.patient,
        study: editingPatient.study,
        studyDate: editingPatient.studyDate,
        refPhysician: editingPatient.refPhysician,
        institution: editingPatient.institution,
        assignment: editingPatient.assignment,
        status: editingPatient.status,
      });
    }
  }, [editingPatient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://patient-table-data-dd724b9d8b7d.herokuapp.com/api/patients/${editingPatient._id}`, editedData);
      onEditSuccess();
      onClose();
      toast("Edit saved successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error saving edited data:", error);
    }
  };

  return (
    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Edit Patient Data</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
            <div className="col-6 mb-3">
              <label htmlFor="patient" className="form-label">Patient</label>
              <input type="text" className="form-control" id="patient" name="patient" value={editedData.patient} onChange={handleInputChange} />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="study" className="form-label">Study</label>
              <input type="text" className="form-control" id="study" name="study" value={editedData.study} onChange={handleInputChange} />
            </div>
            <div className="col-12 mb-3">
              <label htmlFor="study_date" className="form-label">Study Date</label>
              <input type="text" className="form-control" id="study_date" name="study_date" value={editedData.studyDate} onChange={handleInputChange} />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="ref_physician" className="form-label">Ref Physician</label>
              <input type="text" className="form-control" id="ref_physician" name="ref_physician" value={editedData.refPhysician} onChange={handleInputChange} />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="institution" className="form-label">Institution</label>
              <input type="text" className="form-control" id="institution" name="institution" value={editedData.institution} onChange={handleInputChange} />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="assignment" className="form-label">Assignment</label>
              <input type="email" className="form-control" id="assignment" name="assignment" value={editedData.assignment} onChange={handleInputChange} />
            </div>
            <div className="col-6 mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <input type="text" className="form-control" id="status" name="status" value={editedData.assignment} onChange={handleInputChange} />
            </div>
            </div>
            <div className="row">
            <button type="button" className="btn col-12" onClick={handleSave}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
