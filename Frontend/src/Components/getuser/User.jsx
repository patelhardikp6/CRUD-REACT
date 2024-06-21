import React, {useState,useEffect}from "react";
import {Link} from "react-router-dom";
import "./user.css";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users,setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const res = await axios.get("http://localhost:8000/api/getall");
      setUsers(res.data);
    }
    fetchData();
  },[])

  const deleteUser = async(userId) => {
    await axios.delete(`http://localhost:8000/api/delete/${userId}`)
    .then((res) => {
      setUsers((prevUser) => prevUser.filter((user) => user.id !== userId));
      toast.success(res.data.msg, {position:"top-right"});
    }).catch((err) =>{
      console.log(err);
    })
  }
  return (
    <div className="userTable">
      <Link to={"/add"} className="addBtn">Add User</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{
          users.map((user,index) => {
            return(
              <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="actionBtn">
                      <Link to={"/update"}>Edit</Link>
                      {/* <button className="editBtn" onClick={}>Edit</button> */}
                      <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
}

export default User;