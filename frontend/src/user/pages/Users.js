import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "sora",
      image: "https://source.unsplash.com/user/erondu/1600x900",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
