import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser, removeUser } from "../redux/userSlice";
import { useParams, Link } from "react-router-dom";
import Page from "./Page";

const Table = () => {
 
  const navigate=useNavigate()
 
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
   
   
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4001");
        // console.log(response, "oooo");
        dispatch(getUser(response.data));
      } catch (error) {
        // console.log(error, "error while getting the data");
      }
    };
    fetchData();
  }, []);

 

 
   
  
  const handleEdit=async(user)=>{
    try {
        console.log(user,"editing   .....")
        navigate(`/edituser/${user}`);
    } catch (error) {
        console.log(error)
        
    }
  }

  const handleDelete = async (id) => {
    try {
      // console.log(id, "id of the data");
      axios.delete(`http://localhost:4001/delete/${id}`).then((res) => {
        dispatch(removeUser({ id }));
      });
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle errors here
    }
  };

  
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-600">
      <div className="overflow-x-auto">
        <table className="table bg-black">
          <th>
            <Link to="/adduser">
              <button className="btn btn-info">Add User  +</button>
            </Link>
          </th>
          <tbody>
            {users.map((user) => {
              return (
                <tr className="text-red-600">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                  <button className="btn btn-info" onClick={()=>{
                      console.log(user._id,"user id ")
                    handleEdit(user.id)
                  }}>Edit</button>
                   <button
                      className="btn btn-error"
                      onClick={() => {
                        handleDelete(user.id);
                        console.log(user.id, "ooo");
                      }}
                    >
                      Delete
                    </button>
                  </td>
                
                </tr>
              );
            })}
          </tbody>
          <Page />
        </table>
      </div>
    </div>
  );
};

export default Table;
