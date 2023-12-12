import React, {useEffect, useState} from 'react'
import socket from '../config/socket.jsx'


const messageComp = (props) => {
	const [users, setUsers] = useState(props.users)
	const [user, setUser] = useState({})
	const [value, setValue] = useState('')

	socket.connect();

	
		
	useEffect(() => {
		let arrUser = users.filter((d) => d.self === true)
		console.log(arrUser[0])
		setUser(arrUser[0])
	}, [user])

	
	const handleSubmit = (e) => {
		e.preventDefault()

		socket.connect(); 
		console.log(user.room)
		socket.emit('send_message', {value: value, room: user.room, username: user.username})
	}


	useEffect(() => {
		socket.on('recive-private-msg', (data) => {
			console.log(data)
		})
	}, [socket])
	

	return (
		<form onSubmit={handleSubmit}>
		<div className='flex justify-center items-center'>
		<input
		  placeholder="Kirim kan teks..."
		  type='text'
		  value={value}
		  onChange={((e) => setValue(e.target.value))}
		  className='px-6 py-2 bg-[#f8f8f8] outline-none border-none rounded-lg shadow-lg'
		/>
		<button type="submit" className='bg-[#f8f8f8] py-2 px-5 shadow-lg ml-3 rounded-lg hover:bg-[#eee]'>Submit</button>
		</div>
		</form>
	)
}


export default messageComp