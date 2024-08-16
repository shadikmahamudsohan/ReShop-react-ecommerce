import React, { useEffect, useState } from "react";
import UseGet from "../hooks/UseGet";
import UseUpdate from "../hooks/UserUpdate";

const AllUser = () => {
  const [userData, setUserData] = useState([]);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    UseGet({ setData: setUserData, route: "user" });
  }, [reload]);

  function HandleRoleSwitch(user) {
    let newRole = "";

    if (user?.role === "admin") {
      newRole = "user";
    } else {
      newRole = "admin";
    }

    UseUpdate({
      data: { id: user?._id, role: newRole },
      route: "user/test",
      reload,
      setReload,
    });
  }
  return (
    <div className="">
      <table className="">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user?._id}>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>
                <button className="" onClick={() => HandleRoleSwitch(user)}>
                  Change Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
