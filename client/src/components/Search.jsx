import React from 'react';
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  // const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  console.log(users,"users data..")
  return (
    

    <div className="relative">
      <input
        type="text"
        placeholder="Search here"
        className="input input-bordered input-primary w-full max-w-xs pl-8 " // Adjust padding for the icon
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default Search;
