// import queryString from 'querystring';
// import myglobal from './myglobal';
// const fetch = require('node-fetch');
let host = '';
if (window.require) {
  host = 'http://127.0.0.1:8000';
}
function myFetch(method, url, body, cb, headers2, err_callback) {
  let data;
  let headers;
  if (headers2) {
    headers = headers2;
  } else {
    headers = { 'Content-Type': 'application/json' };
  }
  if (method === 'GET') {
    data = {
      method: method,
      credentials: 'include',
      headers: headers,
    };
  } else {
    data = {
      method: method,
      credentials: 'include',
      headers: headers,
      body: body,
    };
  }
  return fetch(host + url, data)
    .then((response)=>{
      // console.log(response);
    	if (response.status >= 200 && response.status < 300) {
        // console.log(response);
    	  	var r = response.json();
		    r.then(cb).catch(err_callback);
		  }
		  else{
			  const error = new Error(`HTTP Error ${response.statusText}`);
			  error.status = response.statusText;
			  error.response = response;
			  if (err_callback) err_callback(error);
		  }
    }).catch((e)=>{
      console.log(e);
    	if (err_callback) err_callback(e);
    })
}
function getRaw(url, cb, err_callback) {
  return myFetch('GET', url, undefined, cb, undefined, err_callback);
}
function get(url, data, cb, err_callback) {
  let s=new URLSearchParams()
  for(let  o in data ){ 
    // console.log(o) 
    s.append(o,data[o]);
  }
  url = url + '?' + s.toString();
  // console.log(url);
  return getRaw(url, cb, err_callback);
}
function delete1(url, data, cb,err_callback) {
  var method = 'DELETE';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function post(url, data, cb,err_callback) {
  var method = 'POST';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function multi(data,cb,err_callback){
  post("/rest/multi/",data,cb,err_callback)
}
function put(url, data, cb,err_callback) {
  var method = 'PUT';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postOrPut(url, data, cb,err_callback) {
  var method = 'POST';
  if (data.id) {
    method = 'PUT';
  }
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postForm(url, data, cb,err_callback) {
  var method = 'POST';
  return fetch(url, {
    method: method,
    credentials: 'include',
    body: data,
  }).then((response)=>{
    	  if (response.status >= 200 && response.status < 300) {
    	  	var r = response.json();
		    r.then(cb).catch(err_callback);
		  }
		  else{
			  const error = new Error(`HTTP Error ${response.statusText}`);
			  error.status = response.statusText;
			  error.response = response;
			  err_callback(error);
		  }
  }).catch((e)=>{
    	err_callback(e);
  })

}
function contacts(data, cb, err_callback) {
  return get('/rest/Contact/', data, cb, err_callback);
}
function UsePacks(query, cb,err_callback) {
  var data = { contact: query };
  return get('/rest/UsePack/', data, cb,err_callback);
}
function PackItems(query, cb) {
  var data = { pack: query };
  return get('/rest/PackItem/', data, cb);
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
function items(query, cb) {
  var data = { search: query };
  return get('/rest/Item/', data, cb);
}
// function sql(query, cb) {
//   var data = { query: query };
//   return get('/sql/', data, cb);
// }

function login_index(cb) {
  return get('/rest/login/', undefined, cb);
}
function logout(cb) {
  return get('/rest/logout/', undefined, cb);
}

function login(username, password, cb) {
  //post form
  var payload = {
    username: username,
    password: password,
  };
  
  let s=new URLSearchParams()
  for(let  o in payload ){ 
    // console.log(o) 
    s.append(o,payload[o]);
  }
  var body = s.toString();
  return myFetch('POST', '/rest/login/', body, cb, {
    'META':'CSRF_COOKIE',
    'Content-Type': 'application/x-www-form-urlencoded',
  });
}
function sql(cmd, callback) {
  get('/rest/sql/', { cmd: cmd }, callback, null);
}
const Client = {
  init: (m, callback) => {
    callback();
  },
  multi,
  sql,
  getRaw,
  contacts,
  items,
  users,
  cache_users,
  login_index,
  login,
  logout,
  UsePacks,
  PackItems,
  get,put,
  post,
  postOrPut,
  delete1,
  postForm,
};
export default Client;
