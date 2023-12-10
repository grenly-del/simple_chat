import React, { useState, useEffect } from 'react';
import socket from '../config/socket.jsx';
import MessageComp from './messageComp'
import PrivateMsg from './privatemsg'


const RoomComp = () => {
  const [data, setData] = useState({ username: '', room: '' });
  const [usernameReady, setUsernameReady] = useState(false)
  const [users, setUsers] = useState(null)
  const [show, setShow] = useState(false)
  const [privateID, setPrivateID] = useState(false)
  const [userIDPrivate, setUserID] = useState(false)

 

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsernameReady(true)
    socket.auth = { username: data.username, room: data.room }

    socket.connect();

     socket.on('users', (users) => {
      users.forEach((user) => {
      user.self = user.userID === socket.id;
    });
    // put the current user first, and then sort by username
    let dataUsers = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.username < b.username) return -1;
      return a.username > b.username ? 1 : 0;
    });
    console.log(dataUsers)
    dataUsers = dataUsers.filter(user => user.room == data.room)
    console.log(dataUsers)
    setUsers(dataUsers !== null || dataUsers !== undefined ? dataUsers : false)
    setShow(true)
    setPrivateID(false)
  })
    socket.emit('join_room', data.room)

    socket.on('connect_error', (err) => {
    	if( err.message === 'Username Invalid' ) {
    		setUsernameReady(false)
        setShow(false)
        setPrivateID(false)
    		console.log('server error')
    	}
    })
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = (e) => {
    if( e.target.dataset.id !== undefined ) {
      setPrivateID(true)
      setShow(false)
      setUserID(e.target.dataset.id)
      socket.emit('join-private', {room: e.target.dataset.id})
      console.log('selected')
    }
  }


  const handleCheck = () => {
    setPrivateID(false)
    setShow(true)
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Room</label>
          <input
            type="text"
            name="room"
            value={data.room}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {users && 
      <ul>
        {users.map(user => (
          <li key={user.userID}><a href="#" data-id={user.userID} onClick={handleClick}>{user.username}</a></li>
        ))}
      </ul>
      }
      <button onClick={handleCheck}>All users</button>
      {show && privateID == false ? <MessageComp users={users} /> : ''}
      {privateID && show == false ? <PrivateMsg userid={userIDPrivate} /> : ''}
    </div>
  )
}

export default RoomComp;
