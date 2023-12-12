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
    e.preventDefault()
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
    <div className='relative w-[400px] text-center  bg-[#fff] rounded-xl shadow-lg font-Quick font-bold px-10 py-5'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col my-6'>
          <label className='text-left'>Username</label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            autoComplete="off"
            placeholder='Masukkan Username'
            className='text-sm font-normal bg-white outline-none border-none rounded-lg shadow-lg w-[90%] mx-auto py-3 bg-[#f8f8f8] px-3'
          />
        </div>
        <div className='flex flex-col my-6'>
          <label className='text-left'>Room</label>
          <input
            type="text"
            name="room"
            value={data.room}
            onChange={handleChange}
            autoComplete="off"
            placeholder='Masukkan Room'
            className='text-sm font-normal bg-white outline-none border-none rounded-lg shadow-lg w-[90%] mx-auto py-3 bg-[#f8f8f8] px-3'
          />
        </div>
        <div>
          <button type="submit" className='bg-[#f8f8f8] py-2 px-5 shadow-lg mb-5 hover:bg-[#eee]'>Submit</button>
        </div>
      </form>
      {users && 
      <ul className='mb-5'>
        {users.map(user => (
          <li key={user.userID}><a href="#" data-id={user.userID} onClick={handleClick}>{user.username}</a></li>
        ))}
      </ul>
      }
      <button onClick={handleCheck} className='bg-[#f8f8f8] py-2 px-5 shadow-lg mb-5 hover:bg-[#eee]'>All users</button>
      {show && privateID == false ? <MessageComp users={users} /> : ''}
      {privateID && show == false ? <PrivateMsg userid={userIDPrivate} /> : ''}
    </div>
  )
}



export default RoomComp;
