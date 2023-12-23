import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../redux/userSlice";
import { Link } from "react-router-dom";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userz, setUserz] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
console.log(users,"fetched all users")
  const pageSize = 5; // Number of items per page (changed to 5)

  // Inside the fetchData function
  const fetchData = async (page) => {
    // console.log(page,"pages number")
    try {
      const response = await axios.get(
        `http://localhost:4001?page=${page}&pageSize=${pageSize}`
      );
      // console.log(response,"response from the backend")
      const modifiedData = response.data.users.map((user) => ({
        ...user,
        id: user._id,
      })); // Assuming the ID field is "_id" in the response
      // console.log(modifiedData,"99999")
      dispatch(getUser(modifiedData));
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error, "error while getting the data");
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleEdit = async (user) => {
    try {
      navigate(`/edituser/${user}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/delete/${id}`);
      dispatch(removeUser({ id }));
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle errors here
    }
  };

  const handlePrevPage = () => {
    console.log(currentPage, "previos button");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(currentPage, "after prev");
    }
  };

  const handleNextPage = () => {
    console.log(currentPage, "next button");
    console.log(totalPages, "total button");
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
const searchHandle = async (e) => {
  try {
    const item = e.target.value;
    if (item) {
      const response = await axios.get(
        `http://localhost:4001/search/${item}`
      );
      console.log(response.data, "correct search");

      if (response.data && response.data.length > 0) {
        setUserz(response.data);
      } else {
        setUserz([]);
      }
    } else {
      fetchData(currentPage);
      setUserz([]);
    }
  } catch (error) {
    console.log(error);
  }
};

  
  console.log(userz, "ooo");

  // console.log(totalPages,currentPage,"total pages")
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-600">
      <div className="overflow-x-auto">
        <table className="table bg-black">
          <th>
            <Link to="/adduser">
              <button className="btn btn-info">Add User +</button>
            </Link>
          </th>
          <th>
            <input
              type="text"
              className="input input-bordered input-primary"
              placeholder="search here"
              onChange={searchHandle}
            ></input>
          </th>

          <tbody>
            {(userz.length > 0 ? userz : users).map((user,index) => {
              return (
                <tr key={user._id} className="text-red-600">
                  {/* <td>{index+1}</td> */}
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        handleEdit(user.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {/* Display 'No User Found' when userz is empty */}
             
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="flex justify-between ">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="btn btn-outline text-pink-600"
                >
                  Previous Page
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline text-green-600"
                >
                  Next Page
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;
