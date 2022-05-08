import io from 'socket.io-client';
const HOST = 'http://localhost:8000';
var socket = io.connect(HOST);
function get(url, data, cb, err_callback) {
  console.log(url);
  console.log(data);
  let urls = url.split('/');
  let new_url = '/get/' + urls[2];
  console.log("=============")
  console.log(new_url);
  socket.emit(new_url, data, cb);
}
function delete1(url, data, cb) {
  console.log(url);
  console.log(data);
  let urls = url.split('/');
  let new_url = '/delete/' + urls[2];
  console.log(new_url);
  socket.emit(new_url, data, cb);
}
function post(url, data, cb) {
  console.log(url);
  console.log(data);
  let urls = url.split('/');
  let new_url = '/post/' + urls[2];
  console.log(new_url);
  socket.emit(new_url, data, cb);
}
function put(url, data, cb) {
  console.log(url);
  console.log(data);
  let urls = url.split('/');
  let new_url = '/put/' + urls[2];
  console.log(new_url);
  socket.emit(new_url, data, cb);
}
function sql(cmd, cb) {
  socket.emit("/sql",cmd, cb);
}

function postOrPut(url, data, cb) {
  if (data.id) {
    return put(url, data, cb);
  } else {
    return post(url, data, cb);
  }
}
function postForm(url, data, cb) {
  post(url, data, cb);
}
function contacts(data, cb, err_callback) {
  return get('/rest/Contact', data, cb, err_callback);
}
function UsePacks(query, cb) {
  var data = { contact: query };
  return get('/rest/UsePack', data, cb);
}
function PackItems(query, cb) {
  var data = { pack: query };
  return get('/rest/PackItem', data, cb);
}
function items(query, cb) {
  var data = { search: query };
  return get('/rest/Item', data, cb);
}
function login_index(cb) {
  return get('/rest/login_index', undefined, cb, (error) => {
    alert(error + '\n请检查服务器/刷新网页/登录');
  });
}
function logout(cb) {
  return get('/rest/logout', undefined, cb);
}

function login(username, password, cb) {
  var payload = {
    username: username,
    password: password,
  };
  socket.emit('/get/login', payload, cb);
}
function users( cb) {
  var data = {};
  return get('/rest/view_user/',data,  cb);
}
var users_c=null;
function cache_users(cb){
  if(users_c===null){
    users((res)=>{
      if(res.success){
        users_c=res.data;
        cb(users_c);
      }
      else{
        console.log("not success")
      }
    });
  }
  else{
    cb(users_c);
  }
}

const Client = {
  init: (m, callback) => {
    callback();
  },
  cache_users,
  contacts,
  items,
  login_index,
  login,
  logout,
  UsePacks,
  PackItems,
  get,
  post,
  put,
  postOrPut,
  delete1,
  postForm,
  sql,
};
export default Client;
