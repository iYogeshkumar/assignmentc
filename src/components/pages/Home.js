import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
  const [data, setData] = useState([{}]);
  
  useEffect(() => {
    loadUsers();
  }, []);
  async function loadUsers(updated) {
    if (localStorage.getItem('firstTime') == 1) {
      const result = await axios.get("https://reqres.in/api/users", {
       
      });
      setData(result.data.data);
      localStorage.setItem('firstTime', 0)
      localStorage.setItem('data', JSON.stringify(result.data.data))
    }
    else if (updated != null) {
      setData(updated);
      localStorage.setItem('data', JSON.stringify(updated))
    }
    else {
      setData(JSON.parse(localStorage.getItem('data')));
    }
  };

  const deleteUser = async id => {
    try {
      const res = await axios.delete(`https://reqres.in/api/users/${id}`, {
        
      });
      if (res.status == 204) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].id == id) {
            id = i;
            break;
          }
        }
        if (data[i] != null && data[i] != undefined)
          await delete (data[id]);
        const filtered = data.filter(function (el) {
          return el != null;
        });
        loadUsers(filtered)
      }
    }
    catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="container">
      <Link className="btn btn-primary" to="/users/add">Add User</Link>
      <div className="py-4">
        <table className="table border shadow">
          <thead className="thead-light">
            <tr>
              
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>

              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <tr>
                
                <td className="align-middle">{user.id}</td>
                <td className="align-middle">{user.first_name}</td>

                <td className="align-middle">{ user.last_name}</td>
                <td className="align-middle">{user.email}</td>
                <td className="align-middle">
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
      </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => {
                      const confirm = window.confirm("Confirm Delete");
                      if (confirm == true) {
                        deleteUser(user.id);
                      }
                    }}
                  >
                    Delete
      </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;