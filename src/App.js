import React from "react";
import Table from './components/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
        < Table />
        <ToastContainer />
    </div>
  );
}

export default App;
