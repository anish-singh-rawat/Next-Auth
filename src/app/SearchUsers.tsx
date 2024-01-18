"use client";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const SearchUsers = (props: any) => {
  const [searchName, setSearchName] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/Getusers"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filterUser = users.filter((user: any) => user.name === searchName.trim());
    setFilteredUsers(filterUser);
    props.getPropState(filterUser.length > 0 && false)
    setSearchName('')
  };

  return (
    <>
      <center>
        <div className="flex justify-center show-user-data">
          <input
            type="text"
            placeholder="Search User By Name ..."
            value={searchName}
            onChange={(e)=> setSearchName(e.target.value)}
            className="border-2 w-64 h-8 mt-4 border-solid border-black rounded-2xl"
          />
          <SearchIcon
            className="mt-5 w-10 h-8 mx-6 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </center>

      <div className="show-user-data mt-2">
        {
          filteredUsers.length === 0 ? (
            <center>
              { !props.test && <div className="mt-2"> NO User Found</div>}
            </center>
          ) :

            <div>
              {
                props.test2 && <center>
                  <div className="font-bold text-2xl mt-2">
                    Filter User are here :-
                  </div>
                </center>
              }
              {
                props.test2 &&
                <div>

                  {filteredUsers.map((item: any) => (
                    <div key={item._id}
                      className="flex flex-col mt-6 p-4 border rounded-md bg-gray-100" >
                      <div className="flex justify-between">
                        <div className="mt-3 text-xl font-semibold">
                          Name : {item.name}
                        </div>
                        <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer">
                          <div>Edit </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="mt-3 text-xl font-semibold break-words">
                          Email : {item.email}
                        </div>
                        <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer">
                          <div>Edit </div>
                        </div>
                      </div>
                      <center>
                        <div className="mt-4 bg-orange-700 rounded-md p-2 cursor-pointer">
                          <div> Delete User </div>
                        </div>
                      </center>
                    </div>
                  ))}
                </div>
              }
              {/* 
              {filteredUsers.map((item: any) => (
                <div key={item._id}
                  className="flex flex-col mt-6 p-4 border rounded-md bg-gray-100" >
                  <div className="flex justify-between">
                    <div className="mt-3 text-xl font-semibold">
                      Name : {item.name}
                    </div>
                    <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer">
                      <div>Edit </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="mt-3 text-xl font-semibold break-words">
                      Email : {item.email}
                    </div>
                    <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer">
                      <div>Edit </div>
                    </div>
                  </div>
                  <center>
                    <div className="mt-4 bg-orange-700 rounded-md p-2 cursor-pointer">
                      <div> Delete User </div>
                    </div>
                  </center>
                </div>
              ))} */}
            </div>

        }
      </div>
    </>
  );
};

export default SearchUsers;
