import React, { useState } from 'react';
import axios from 'axios';

const SignIn = () => {
  const [data, setData] = useState({
    userId: 'userId',
    pwd: 'pwd',
    nick: 'nick',
    userPhone: 'userPhone',
    userAccount: 'userAccount',
    userAddr: 'userAddr'
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://220.127.80.225:12345/api/users', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <div>
        <label>
        userId:
          <input type="text" name="userId" value={data.userId} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
        pwd:
          <input type="text" name="pwd" value={data.pwd} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
        nick:
          <input type="text" name="nick" value={data.nick} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
        userPhone:
          <input type="text" name="userPhone" value={data.userPhone} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
        userAccount:
          <input type="text" name="userAccount" value={data.userAccount} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
        userAddr:
          <input type="text" name="userAddr" value={data.userAddr} onChange={handleChange} />
        </label>
      </div>
      <button onClick={handleSubmit}>Send Data</button>
    </div>
  );
};

export default SignIn;
