import React from "react";
import Table from './components/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="container my-5 align-item-center justify-content-center">
        < Table />
        <ToastContainer />
    </div>
  );
}

export default App;
