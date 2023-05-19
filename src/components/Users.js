import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/users/usersSlice';

const Users = () => {
  const dispatch = useDispatch();
  let { users, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers()).catch((error) => {
      console.log(error);
      return error;
    });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2>Users Random</h2>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <p>First Name:{user.name.first}</p>
            <p>Last Name: {user.name.last}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
