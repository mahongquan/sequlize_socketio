/* eslint-disable no-undef */
var io = require("socket.io-client");
var socket=io();
function getRaw(url,cb) {
  socket.emit("/get"+url,{},cb);
}
function get(url,data,cb) {
  console.log("emit")
  console.log(url);
  console.log(data);
  socket.emit("/get"+url,data,cb)
}
function delete1(url,data,cb) {
  socket.emit("/delete"+url,data,cb)
}
function post(url,data,cb) {
  socket.emit("/post"+url,data,cb)
}
function put(url,data,cb) {
  socket.emit("/put"+url,data,cb)
}
function postOrPut(url,data,cb) {
  var method="post"
  if (data.id){
    method="put"
  }
  socket.emit("/"+method+url,data,cb)
}
function postForm(url,data,cb) {
  socket.emit("/post"+url,data,cb)
}
function contacts(data, cb) {
  socket.emit("/get/Contact",data,cb)
}
function UsePacks(query, cb) {
  console.log("UsePacks");
  console.log(query);
  socket.emit("/get/UsePack",{contact_id:query},cb)
}
function PackItems(query, cb) {
  socket.emit("/get/PackItem",{pack_id:query,limit:200},cb)
}

function items(query, cb) {
  socket.emit("/get/Item",{search:query},cb)
}
function login_index( cb) {
  return fetch('/rest/login_index', {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function logout( cb) {
  return fetch('/rest/logout', {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function login(username,password,cb) {
  var payload = {
    username: username,
    password: password,
  };
  return fetch("/rest/login",
  {
      method: "POST",
      credentials: 'include',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify( payload )
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  console.log("parse");
  console.log(response.body);
  var r= response.json();
  return r;
}

const Client = {getRaw,contacts,items,login_index,login,logout,UsePacks,PackItems,get,post,postOrPut,delete1,postForm};
export default Client;
