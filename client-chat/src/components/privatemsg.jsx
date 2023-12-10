import React, {useEffect, useState} from 'react'
import socket from '../config/socket.jsx'


const messageComp = (props) => {
	const [value, setValue] = useState('')

	socket.connect();
		
	const handleSubmit = (e) => {
		e.preventDefault()
		socket.connect(); 
		console.log('private-message')
		socket.emit('private-message', {value: value, room: props.userid})
	}


	useEffect(() => {
		socket.on('recive_message', (msg) => {
			console.log(`msg ${msg}`)
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