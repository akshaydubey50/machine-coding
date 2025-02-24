import React,{useEffect, useState} from 'react'
import socket from '../hook/useSocket';

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  useEffect(()=>{

        // Listen for incoming messages
        socket.on("userMessage", (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });

         // Process Data for incoming messages
         socket.on("botMessage", (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
          socket.off("userMessage"); // Cleanup event listener when unmounting
        };
  },[])

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("userMessage", message); // Send message to server
      setMessage(""); // Clear input after sending
    }
  };
  
  return (
<>
<h1>Chatbot Development</h1>
<div className="p-4">
      <div className="border p-3 mb-2 h-64 overflow-y-auto">
        {messages?.map((msg, index) => (
          <p key={index} className="bg-gray-200 p-2 rounded my-1">{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full"
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} className="mt-2 bg-blue-500 text-white p-2 rounded">
        Send
      </button>
    </div>
</>
  )
}
