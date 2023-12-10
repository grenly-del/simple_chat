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
		<div style={{display: "flex"}}>
		<input
		  placeholder="Kirim kan teks..."
		  type='text'
		  style={{color: 'white'}}
		  value={value}
		  onChange={((e) => setValue(e.target.value))}
		/>
		<button type="submit">Submit</button>
		</div>
		</form>
	)
}


export default messageComp