import React, { Component } from 'react';
import io from 'socket.io-client';
import { Button, Modal } from 'react-bootstrap';
var socket = io.connect();
export default function App(props){
  const [state,setState]=React.useState({
    emit_data:"",
    logs:[]
  });
  React.useEffect(()=>{
    // socket = io.connect();

    socket.on('connect', ()=>{
        socket.emit('my_event', {data: 'I\'m connected!'});
    });
    socket.on('disconnect', ()=> {
        l=state.logs;
        l.push('Disconnected')
        setState((state)=>({...state,logs:l}));
    });
    socket.on('my_response', (msg)=> {
        l=state.logs;
        l.push('Received: ' + msg.data);
        setState((state)=>({...state,logs:l}));
    });

    // $('form#join').submit(function(event) {
    //     socket.emit('join', {room: $('#join_room').val()});
    //     return false;
    // });
    // $('form#leave').submit(function(event) {
    //     socket.emit('leave', {room: $('#leave_room').val()});
    //     return false;
    // });
    // $('form#send_room').submit(function(event) {
    //     socket.emit('my_room_event', {room: $('#room_name').val(), data: $('#room_data').val()});
    //     return false;
    // });
    // $('form#close').submit(function(event) {
    //     socket.emit('close room', {room: $('#close_room').val()});
    //     return false;
    // });
    // $('form#disconnect').submit(function(event) {
    //     socket.emit('disconnect request');
    //     return false;
    // });

  },[]);
  const echo=()=>{
    socket.emit('my_event', {data: state.emit_data});
  }
  console.log(state);
  let ele_logs=state.logs.map((item,index)=>{
    return(<p key={index}>{item}</p>)
  });
  return(<div><h1>python-socketio test</h1>
    <h2>Send:</h2>
    <div>
        <input type="text" onChange={(e)=>{
            setState((state)=>({...state,emit_data:e.target.value}));
        }} value={state.emit_data} id="emit_data" placeholder="Message" />
        <Button onClick={echo}>Echo</Button>
    </div>
    <div>
        <input type="text" onChange={(e)=>{
            setState((state)=>({...state,broadcast_data:e.target.value}));
        }} value={state.broadcast_data}  placeholder="Message" />
        <Button onClick={()=>{
            socket.emit('my_broadcast_event', {data: state.broadcast_data});
        }}>broadcast</Button>
    </div>
    <div>
        <input type="text" onChange={(e)=>{
            setState((state)=>({...state,join_room:e.target.value}));
        }} value={state.join_room}  placeholder="room name" />
        <Button onClick={()=>{
            socket.emit('join', {room: state.join_room});
        }}>join room</Button>
    </div>
    <div>
        <input type="text" onChange={(e)=>{
            setState((state)=>({...state,leave_room:e.target.value}));
        }} value={state.leave_room}  placeholder="room name" />
        <Button onClick={()=>{
            socket.emit('leave', {room: state.leave_room});
        }}>leave room</Button>
    </div>

    <div>
        <input type="text" onChange={(e)=>{
            setState((state)=>({...state,room_name:e.target.value}));
        }} value={state.room_name}  placeholder="room name" />
        <input type="text" onChange={(e)=>{
            setState((state)=>({...state,room_data:e.target.value}));
        }} value={state.room_data}  placeholder="room name" />
        <Button onClick={()=>{
            socket.emit('my_room_event', {room: state.room_name, data: state.room_data});
        }}>send room</Button>
    </div>
    <div>
        <input type="text" onChange={(e)=>{
            setState((state)=>({...state,close_room:e.target.value}));
        }} value={state.close_room}  placeholder="room name" />
        <Button onClick={()=>{
            socket.emit('close room', {room: state.close_room});
        }}>close room</Button>
    </div>
    <div>
        <Button onClick={()=>{
            socket.emit('disconnect request');
        }}>disconnect</Button>
    </div>
    <h2>Receive:</h2>
    <div>{ele_logs}</div>
    </div>);
}