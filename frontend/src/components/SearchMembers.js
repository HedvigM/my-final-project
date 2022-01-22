import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/url';

export const SearchMembers = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch(API_URL('members'))
      .then((res) => res.json())
      .then((data) => {
        setList(data.response);
      });
  }, []);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      {list
        .filter((item) => {
          if (!value) return true;
          if (item.memberName.toLowerCase().includes(value)) {
            return true;
          }
        })
        .map((item) => (
          <div>
            <p>{item.memberName}</p>
          </div>
        ))}
    </div>
  );
};
