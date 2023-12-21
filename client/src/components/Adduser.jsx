import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import {  Link, useNavigate } from "react-router-dom";

const Adduser = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const handleSubmitt=(e)=>{
    
    e.preventDefault()
    if (name === "" || email === "" || age === "") {
      alert("Please fill in the details");
      return;
    }
    const response=axios.post("http://localhost:4001/create-user",{
      name,email,age
      
    }).then((res)=>{
      if(res.data.error){
        alert("email already exists")
      }
      else{
        dispatch(addUser(res.data));
         navigate('/')

      }
    }).catch((err)=>console.log(err))


  }


  return (
    <div className="flex justify-center mt-12 ">
      <div className="h-96 w-96 bg-slate-600">
        <form onSubmit={handleSubmitt}>
          <div className="ml-4">
             <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Type Name"
            className="input input-bordered input-success w-full max-w-xs"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Type Name"
            className="input input-bordered input-success w-full max-w-xs"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="text"
            placeholder="Type Name"
            className="input input-bordered input-success w-full max-w-xs"
            onChange={(e) => setAge(e.target.value)}
          />
          
          </div>
          <div className="mt-9 text-center">
            <button className="btn btn-info" > <Link to='/'>Back</Link></button>
          <button type="submit" className="btn ml-10 btn-success">
          Submit
          </button>
                
          </div>
         
           
        </form>
      </div>
    </div>
  );
};

export default Adduser;
