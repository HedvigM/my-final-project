import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/url';

export const SearchMembers = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
      });
  }, []);
  console.log(list);
  return (
    <>
      <h1>Search for a member</h1>
      {list.map((item) => (
        <div key={item._id}>
          <p>{item.memberName}</p>
        </div>
      ))}
    </>
  );
};
