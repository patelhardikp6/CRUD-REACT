import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "./Edit.css";
import toast from "react-hot-toast";

const edit = () => {
    const users = {
        name:"",
        email:"",
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = useState(edit);

    const inputChangeHandler = (e) => {
        const {name,value} = e.target;
        setUser({...user, [name]:value});
        console.log(user);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`)
        .then((res) => {
            setUser(res.data);
        }).catch(err => console.log(err));
    },[id])

    const submitForm = async(e) => {
         e.preventDefault();
            await axios.put(`http://localhost:8000/api/update/${id}`,user)
            .then((res) => {
                toast.success(res.data.msg, {postion:"top-right"});
                navigate("/");
            }).catch(err => console.log(err))
    }
    return(
        <div className="editUser">
            <Link to={"/"}>Back</Link>
            <h3>Update User</h3>
            <form className="editUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Enter name</label>
                    <input type="text" value={user.name} onChange={inputChangeHandler} id="name" name="name" autoComplete="off" placeholder="Enter Your name"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Enter email</label>
                    <input type="email" value={user.email} onChange={inputChangeHandler}  id="email" name="email" autoComplete="off" placeholder="Enter Your email"></input>
                </div>
                <div className="inputGroup">
                   <button type="submit">UPDATE USER</button>
                </div>
            </form>
        </div>
    )
}

export default edit;