import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, addUser, updateUser, removeUser } from "../redux/userSlice";
import { useParams } from "react-router-dom";
import Page from "./Page";
import Search from "./Search";
import Sort from "./Sort";
import Filter from "./Filter";

const Table = () => {
  const { id } = useParams();
  // console.log(id)
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  // console.log(users,"data of the user from redux")
  const user = users.find((u) => u.id === id);
  // console.log(user,"id")
  // console.log(users,"redux")
  // users.forEach(user => {
  //   console.log(user.name,"teena");
  // });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

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
  }, [user,dispatch]);

  const [names, setNames] = useState(user ? user.name : "");
  const [emails, setEmails] = useState(user ? user.email : "");
  const [ages, setAges] = useState(user ? user.age : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || age === "") {
      alert("Please fill in the details");
      return;
    }

    axios
      .post("http://localhost:4001/create-user", { name, email, age })
      .then((res) => {
        // console.log(res, "response from the backend...");
        if (res.data.error) {
          alert("Email already exists"); // Show alert for existing email
        } else {
          dispatch(addUser(res.data));
          setName("");
          setEmail("");
          setAge("");
          document.getElementById("my_modal_6").checked = false
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(name,email,age,"data ");
  const handelEditClick = (user) => {
    try {
      // console.log(user, "data of the users");
      setNames(user.name);
      setEmails(user.email);
      setAges(user.age);
    } catch (error) {
      console.log(error)
    }
  };
  const handleUpdateSubmit = async (e) => {
    console.log("updation working...")
    console.log(user.id)
    e.preventDefault();
    try {
      // Assuming names, emails, ages, and user are defined correctly
      console.log(user.id, "id of the user");
      const response = await axios.put("http://localhost:4001/update", {
        id: user.id,
        names,  // assuming these variables are defined
        emails,
        ages,
      });
      console.log(response,"response from the backend")
  
      console.log(names, ages, emails, "data of the user");
      // Assuming updateUser is a function dispatching an action
      dispatch(updateUser({ id: user.id, names, emails, ages }));
      document.getElementById("my_dummy").checked = false;
    } catch (error) {
      console.log(error);
    }
  };
  
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

  // console.log(name, age, email, users._id, "updated name");
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-600">
      <div className="overflow-x-auto">
        <table className="table bg-black">
      
          <thead>
          
            <th>
              <form onSubmit={handleSubmit}>
                <label htmlFor="my_modal_6" className="btn">
                  Add +
                </label>

                <input
                  type="checkbox"
                  id="my_modal_6"
                  className="modal-toggle"
                />
                <div className="modal" role="dialog">
                  <div className="modal-box">
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
                      <span className="label-text">Age</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type Age"
                      className="input input-bordered input-success w-full max-w-xs"
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type email"
                      className="input input-bordered input-success w-full max-w-xs"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="mt-9">
                      <button type="submit" className="btn ml-10 btn-success">
                        Submit
                      </button>
                      <label
                        htmlFor="my_modal_6"
                        className="btn ml-10 btn-warning"
                      >
                        Close!
                      </label>
                    </div>
                  </div>
                </div>
              </form>
             
               
                
             
            </th>
            <th>
            <Search/>
            </th>
            <th>
              <Sort/>
            </th>
            <th>
            
              <Filter/>
            </th>
         
           

            <tr className="text-white">
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr className="text-red-600">
                   
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <label
                      htmlFor="my_dummy"
                      className="btn btn-success"
                      onClick={() => {
                        // console.log(user.id, "id of the user");
                        handelEditClick(user);
                      }}
                    >
                      Update
                    </label>
                    <form onSubmit={handleUpdateSubmit}>
                      <input
                        type="checkbox"
                        id="my_dummy"
                        className="modal-toggle"
                      />
                      <div className="modal" role="dialog">
                        <div className="modal-box">
                          <label className="label">
                            <span className="label-text">Name</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Type Name"
                            value={names}
                            className="input input-bordered input-success w-full max-w-xs"
                            onChange={(e) => {
                              setNames(e.target.value);
                            }}
                          />
                          <label className="label">
                            <span className="label-text">Age</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Type Age"
                            value={ages}
                            className="input input-bordered input-success w-full max-w-xs"
                            onChange={(e) => setAges(e.target.value)}
                          />
                          <label className="label">
                            <span className="label-text">Email</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Type email"
                            value={emails}
                            className="input input-bordered input-success w-full max-w-xs"
                            onChange={(e) => setEmails(e.target.value)}
                          />
                          <div className="mt-9">
                            <button
                              type="submit"
                              className="btn ml-10 btn-success"
                            >
                              Submit
                            </button>
                            <label
                              htmlFor="my_dummy"
                              className="btn ml-10 btn-warning"
                            >
                              Close!
                            </label>
                          </div>
                        </div>
                      </div>
                    </form>

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
          <Page/>
        
        </table>
      </div>
    </div>
  );
};

export default Table;
