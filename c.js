const io = require('socket.io-client');
var socket = io.connect("http://127.0.0.1:8000");//location.protocol + '//' + document.domain + ':' + location.port + namespace);
socket.emit("/get/Pack",{},(res)=>{
    console.log(res);
    console.log(res.data[0])
    var p=res.data[0];
    console.log(p)
    socket.emit("/get/PackItem",{pack_id:p.id},(res)=>{
    	console.log(res);
        var pi=res.data[0];
        console.log(pi);
        pi.Item.name=pi.Item.name+"//"
	    socket.emit("/put/PackItem",pi,(res)=>{
	    	console.log(res);
			process.exit()	        
	    });    
    });
});
// socket.emit("/post/Item",{name:"hi",bh:"js",guige:"",danwei:"",ct:0},(data)=>{
//         console.log(data);
//         process.exit()
// });
