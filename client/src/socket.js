// api/index.js
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:4000");

function connect(user,cb1,cb2,cb3) {
  // listen for any messages coming through
  // of type 'chat' and then trigger the
  // callback function with said message
  socket.emit('userLogged',user)
  socket.on("showMessage", message => {
    // console.log the message for posterity
    console.log(message);
    // trigger the callback passed in when
    // our App component calls connect
    cb1(message);
  });
  socket.on("user", message => {
    // console.log the message for posterity
    console.log(message);
    // trigger the callback passed in when
    // our App component calls connect
    cb2(message);
  });
  
}

function sendMessage(message) {
  socket.emit("newMessage",message )
}

export { connect,sendMessage  };