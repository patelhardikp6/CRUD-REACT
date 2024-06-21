import React, { useState } from "react";
import {Link , useNavigate} from "react-router-dom";
import axios from "axios";
import "./Add.css";
import toast from "react-hot-toast";

const add = () => {
    const users = {
        name:"",
        email:"",
        password:""
    }

    const [user,setUser] = useState(users);
    const navigate = useNavigate();

    const inputHandler = (e) => {
        const {name,value} = e.target;
        setUser({...user,[name]:value});
    }

    const submitForm = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/create",user)
        .then((res) => {
            toast.success(res.data.msg, {postion:"top-right"});
            navigate("/");
        }).catch(err => console.log(err))
    }
    return(
        <div className="addUser">
            <Link to={"/"}>Back</Link>
            <h3>Add New User</h3>
            <form className="addUserForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="name">Enter name</label>
                    <input type="text" onChange={inputHandler} id="name" name="name" autoComplete="off" placeholder="Enter Your name"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Enter email</label>
                    <input type="email" onChange={inputHandler} id="email" name="email" autoComplete="off" placeholder="Enter Your email"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" text="password" onChange={inputHandler} id="password" name="password" autoComplete="off" placeholder="Enter Your password"></input>
                </div>
                <div className="inputGroup">
                   <button type="submit">ADD USER</button>
                </div>
            </form>
        </div>
    )
}

export default add;