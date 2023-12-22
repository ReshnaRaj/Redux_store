import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import Page from "./Page";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const pageSize = 5; // Number of items per page (changed to 5)

 // Inside the fetchData function
const fetchData = async (page) => {
  try {
    const response = await axios.get(`http://localhost:4001?page=${page}&pageSize=${pageSize}`);
    const modifiedData = response.data.users.map((user) => ({ ...user, id: user._id })); // Assuming the ID field is "_id" in the response
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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-600">
      <div className="overflow-x-auto">
        <table className="table bg-black">
          <th>
            <Link to="/adduser">
              <button className="btn btn-info">Add User +</button>
            </Link>
          </th>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} className="text-red-600">
                  <td>{user.id}</td>
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
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5" className="flex justify-between">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  Previous Page
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
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
