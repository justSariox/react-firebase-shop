import React from 'react';
import './App.css';
import {auth, db, storage} from "../common/api/common.api";

function App() {
  console.log(db, storage, auth)
  return (
    <div className="App">
      {}
    </div>
  );
}

export default App;
