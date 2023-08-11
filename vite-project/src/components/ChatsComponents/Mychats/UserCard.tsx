import React from "react";

type UserCardProps = {
  name: string;
};

const UserCard = ({ name }: UserCardProps) => {
  return (
    <div className="w-full px-2 mt-2 py-4 bg-white rounded-md">{name}</div>
  );
};

export default UserCard;
