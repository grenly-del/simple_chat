import React from 'react'
import RoomComp from '../components/chatApp'


const ChatApp = () => {
	return (
		<div className='bg-[#f3f3f3] w-full h-[100vh] relative flex justify-center items-center flex-col font-Quick'>
			<h1 className='text-3xl font-bold font-Pacifico -mt-10 mb-5 text-sky-500'>Simple Chat</h1>
			<RoomComp />
			<p className='font-itim font-semibold text-pink-400 mt-5'>Ini masih di dalam mode develop jadi untuk pesannya bisa cek di develop tool.</p>
			<p className='italic font-itim font-semibold text-blue-500'>{'Klik kanan > inspect atau Ctrl + I'}</p>
		</div>
	)
}


export default ChatApp