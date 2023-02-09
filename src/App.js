import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";


function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        

        
          <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/users/add" element={<AddUser/>} />
          <Route exact path="/users/edit/:id" element={<EditUser/>} />
          <Route element={<NotFound/>} />
          </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
