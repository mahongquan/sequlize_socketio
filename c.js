const io = require('socket.io-client');
var socket = io.connect("http://127.0.0.1:8000");//location.protocol + '//' + document.domain + ':' + location.port + namespace);
socket.emit("/get/Contact",{},(res)=>{
    console.log(res);
    console.log(res.data[0])
    var contact=res.data[0];
    console.log(contact)
    socket.emit("/post/UsePackEx",{name:"hi",contact_id:contact.id},(data)=>{
        console.log(data);
        process.exit()
    });
});
// socket.emit("/post/Item",{name:"hi",bh:"js",guige:"",danwei:"",ct:0},(data)=>{
//         console.log(data);
//         process.exit()
// });
