import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { updateUser } from '../redux/userSlice';

const EditUser = () => {
    const {id}=useParams()
    console.log(id,"id of the edit")
    
  
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const users = useSelector((state) => state.users.users);
    const usez = users.find((u) => u.id === id);
    console.log(usez,"888888")
    console.log(users,"edit page")
    const [name,setName]=useState(usez.name)
    const [age,setAge]=useState(usez.age)
    const [email,setEmail]=useState(usez.email)

    const handleUpdateSubmit=(e)=>{
        e.preventDefault()
        const response=axios.put('http://localhost:4001/update/'+id,{name,age,email})
        .then((res)=>{
            dispatch(updateUser({id,name,email,age }));
            navigate('/')
        }).catch((err)=>console.log(err))
    
    }
    
  return (
    <div className="flex justify-center mt-12 ">
    <div className="h-96 w-96 bg-slate-600">
      <form onSubmit={handleUpdateSubmit}>
        <h2 className='text-lg text-center text-pink-500'>Update User</h2>
        <div className="ml-4">
           <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type Name"
          className="input input-bordered input-success w-full max-w-xs"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
           
        />
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Type Name"
          className="input input-bordered input-success w-full max-w-xs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           
        />

        <label className="label">
          <span className="label-text">Age</span>
        </label>
        <input
          type="text"
          placeholder="Type Name"
          className="input input-bordered input-success w-full max-w-xs"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          
        />
        
        </div>
        <div className="mt-9 text-center">
          <button className="btn btn-info" ><Link to='/'>Back</Link></button>
        <button type="submit" className="btn ml-10 btn-success">
        Update
        </button>
              
        </div>
       
         
      </form>
    </div>
  </div>
  )
}

export default EditUser