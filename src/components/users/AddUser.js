import React, { useState } from "react";
import axios from 'axios'
import {  useNavigate } from "react-router-dom";

const AddUser = () => {
  let navigate = useNavigate();
  const [data, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    id: "",
    
  });

  const { first_name, last_name, email, } = data;
  const onInputChange = e => {
    setUser({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("https://reqres.in/api/users", data);
    const temp_data = JSON.parse(localStorage.getItem('data'));
    var last = temp_data.length;
    temp_data[last] = data;
    temp_data[last].id = temp_data[last-1].id + 1;
    localStorage.setItem('data', JSON.stringify(temp_data));
    navigate("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="First Name"
              name="first_name"
              value={first_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Last Name"
              name="last_name"
              value={last_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="E-mail Address"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
        
          <button className="btn btn-primary btn-block" >Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;