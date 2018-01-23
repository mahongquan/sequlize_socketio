#!/usr/bin/env node
var exec = require('child_process').exec;
//var readStandardFile=require('./readstandard')
var static = require('./node-static');
var file = new static.Server('./public');
var debug = require('debug')('express-example');
var models = require("./models");
var ss = require('socket.io-stream');
var path = require('path');
var fs=require('fs')
function DateStr(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var s_month=""+month;
    if (s_month.length<2) s_month="0"+s_month;
    var day = date.getDate();
    var s_day=""+day;
    if (s_day.length<2) s_day="0"+s_day;
    return year + "-" + s_month + "-" + s_day ;
}
models.sequelize.sync().then(
	function () {
		console.log("listen");
  		var server=require('http').createServer(function (request, response) {
		    request.addListener('end', function () {
		        //
		        // Serve files!
		        //
		        file.serve(request, response);
		    }).resume();
		}).listen(8000);
		console.log('node-static & socket.io server listening on port 8000');
		const io = require('socket.io')(server);
  		io.sockets.on('connection', function( socket ) {
  			console.log('connection');
			/**
			 * When a player enters a room
			 * @param object table-data
			 */
			ss(socket).on('file', function(stream, data,callback) {
				// console.log(data);
				// var p=path.join(__dirname, 'media');
			 //    p=path.join(p, data.name);
			 //    var ls=fs.createWriteStream(p);
				// ls.on('close', () => {
				//   console.log('closed');
				// });
			 //    stream.pipe(ls);
			 	var buffers = [];
			    stream.on('data', function(data) { buffers.push(data); });
			    stream.on('end', function() {
			        var buffer = Buffer.concat(buffers);
			        readStandardFile(buffer,data.name,callback)
			    });
			});    
			socket.on('/folder', function( data, callback ) {
				console.log("/folder");
				console.log(data);
				var p=path.join(__dirname, 'media');
				var cmdStr = "start "+p; 
			    //cmdStr = 'curl -u "username:password" https://prefix_link/PR4478847'
			    exec(cmdStr, function(err,stdout,stderr){
			        if(err) {
			            callback({
								success:false,
								message: "open folder fail"
						});
			        } else {
			        		callback({
								success:true,
								message: "open folder ok"
							});
			        }
			    });
			});    
			socket.on('/post/standard', function( data, callback ) {
				console.log("/post/standard");
				console.log(data);
				callback({
					success:true,
					data:[],
					message: "delete Contact ok"
				});

			}); 
			socket.on('/get/month12', async function( data, callback ) {
			    var baoxiang=data.baoxiang;
			   	var end_date=new Date();
			    var start_date=new Date();//datetime.datetime(end_date.year-1,1,1,0,0,0)
			    start_date.setYear(start_date.getYear()-1);
			    start_date.setMonth(1);
			    start_date.setDate(1);

			    // cursor = connection.cursor()            #获得一个游标(cursor)对象
			    // #更新操作
			    var start_date_s= DateStr(start_date);
			    var end_date_s= DateStr(end_date);
			    if (baoxiang==null)
			         cmd="select strftime('%Y-%m',tiaoshi_date) as month,count(id) as ct  from parts_contact  where tiaoshi_date between '"+start_date_s+"' and '"+end_date_s+"' group by month"
			    else
			         cmd="select strftime('%Y-%m',tiaoshi_date) as month,count(id) as ct from parts_contact  where baoxiang like '"+baoxiang+"'  and tiaoshi_date between '"+start_date_s+"' and '"+end_date_s+"' group by month"            
			    var cursor=await models.sequelize.query(cmd)
			    console.log(cursor[0]);
			    // logging.info(cmd)
			    // cursor.execute(cmd)    #执行sql语句
			    // raw = cursor.fetchall()                 #返回结果行 或使用 #raw = cursor.fetchall()		
			    var lbls=[];
			    var values=[]
			    for (var i in cursor[0])				 
			    {
			    	lbls.push(cursor[0][i].month)
			    	values.push(cursor[0][i].ct)
			    }
				callback({
					success:true,lbls:lbls,values:values,
					message: "delete Contact ok"
				});
			});
			socket.on('/parts/showcontact', async function( data, callback ) {	
				var contact = await models.Contact.findById(data.id); //.then(function(packitem) {
				callback({
					data: contact,
					message: "show  Contact ok"
				});
			}); //delete
			//route.delete('/rest/Contact/:contact_id', async function(ctx,next) {
			socket.on('/delete/Contact', async function( data, callback ) {	
				var contact = await models.Contact.findById(data.contact_id); //.then(function(packitem) {
				contact.destroy();
				callback({
					data: [],
					message: "delete Contact ok"
				});
			}); //delete
			//route.post('/rest/Contact', async function(ctx,next) {
			socket.on('/post/Contact', async function( data, callback ) {		
				let  contact;
				try{
					contact=await models.Contact.create(data);
					callback({
						success:true,
						data: contact,
						message: "create Contact ok"
					});
				}
				catch(e){
					console.log(e);
					for(var i in e){
						console.log(i)
					}
					callback({
						success:false,
						message: e.message,
						error:e
					});

				}
			
			});
			//route.put('/rest/Contact', async function(ctx,next) {
			socket.on('/put/Contact', async function( data, callback ) {			
				var contact = await models.Contact.findById(data.id); //.then(function(packitem) {
				contact.update(data);
				contact.save();
				callback({
					success:true,
					data: contact,
					message: "update  Contact ok"
				});
			});
			//route.get('/rest/Contact', async function(ctx,next) {
			socket.on('/get/Contact', async function( data, callback ) {				
				var start = data.start;
				var limit = data.limit;
				let search="";
				if(data.search)
					search = data.search;
				var baoxiang = '';
				if (data.baoxiang) {
					baoxiang = data.baoxiang;
				}
				var w = null;
				if (search != "") {
					if (baoxiang != "") {
						w = {
							$or: {
								yiqibh: {
									$like: "%" + search + "%"
								},
								hetongbh: {
									$like: "%" + search + "%"
								},
							},
							baoxiang: {
								$like: "%" + baoxiang + "%"
							}
						};
					} else {
						w = {
							$or: {
								yiqibh: {
									$like: "%" + search + "%"
								},
								hetongbh: {
									$like: "%" + search + "%"
								},
							}
						};
					}
				} else {
					if (baoxiang != "") {
						w = {
							baoxiang: {
								$like: "%" + baoxiang + "%"
							}
						};
					} else {
						w = {};
					}
				}
				console.log(w);
				var datas = await models.Contact.findAll({
						attributes: [
							[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
						],
						where: w
					})
					//ctx.body=datas;
				var total = datas[0].dataValues.total;
				console.log("total=" + total);
				var contacts = await models.Contact.findAll({
					where: w,
					limit: limit,
					offset: start,
					order: [['yujifahuo_date','DESC']]
				})
				callback({
					data: contacts,
					total: total
				});
			});
			//UsePack//////////////////////////////////////////////////////////////////////
			//route.delete('/rest/UsePack/:contact_id', async function(ctx) {
			socket.on('/delete/UsePack', async function( data, callback ) {				
				var contact = await models.UsePack.findById(data.id); //.then(function(packitem) {
				contact.destroy();
				callback({
					data: [],
					message: "delete UsePack ok"
				});
			}); //delete
			//route.post('/rest/UsePack', async function(ctx,next) {
			socket.on('/post/UsePack', async function( data, callback ) {				
				var contact = await models.UsePack.create(data)
				var pack = await contact.getPack();
				contact.dataValues["Pack"] = pack;
				callback({
					data: contact,
					message: "create UsePack ok"
				});
			});
			//route.put('/rest/UsePack', async function(ctx,next) {
			socket.on('/put/UsePack', async function( data, callback ) {				
				var contact = await models.UsePack.findById(data.id); //.then(function(packitem) {
				contact.update(data);
				contact.save();
				callback({
					data: contact,
					message: "update  UsePack ok"
				});
			});
			socket.on('/post/UsePackEx', async function( data, callback ) {				
				console.log(data);	
				var rec1 = await models.Pack.create(data)
				var rec = await models.UsePack.create({contact_id:data.contact_id,pack_id:rec1.id})
				rec.dataValues["Pack"] = rec1;
				callback({
					data: rec,
					message: "create UsePack ok"
				});
			 });
			socket.on('/post/PackItemEx', async function( data, callback ) {				
				console.log(data);	
				var rec1 = await models.Item.create(data)
				var rec = await models.PackItem.create({pack_id:data.pack_id,item_id:rec1.id,ct:1,quehuo:false})
				rec.dataValues["Item"] = rec1;
				callback({
					data: rec,
					message: "create PackItem ok"
				});
			 });
			// { id: 50,
			//   pack_id: 4,
			//   item_id: 54,
			//   ct: 10,
			//   Item: 
			//    { id: 54,
			//      bh: '010103f001105',
			//      name: 'ON操作维护展板',
			//      guige: '',
			//      ct: 1,
			//      danwei: '个',
			//      beizhu: null,
			//      image: 'item/20140326_011.jpg' } }

			// socket.on('/put/PackItemEx', async function( data, callback ) {				
			// 	console.log(data);	
			// 	var packitem = await models.PackItem.findById(data.id, {
			// 		include: [{
			// 			model: models.Item,
			// 		}],
			// 	}); //.then(function(packitem) {
			// 	console.log("==============================");
			// 	console.log(packitem);
			// 	packitem.update(data);
			// 	packitem.Item.save();
			// 	packitem.save();
			// 	callback({
			// 		data: packitem,
			// 		message: "update PackItem ok"
			// 	});
			//  });
			//route.get('/rest/UsePack', async function(ctx,next) {
			socket.on('/get/UsePack', async function( data, callback ) {				
				var start = data.start;
				var limit = data.limit;
				var search = data.search;
				var w = {
					contact_id: data.contact_id
				};
				var datas = await models.UsePack.findAll({
					attributes: [
						[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
					],
					where: w
				})
				var total = datas[0].dataValues.total;
				console.log("total=" + total);
				var contacts = await models.UsePack.findAll({
					where: w,
					limit: limit,
					offset: start,
					include: [{
						model: models.Pack,
					}],
				})
				callback({
					data: contacts,
					total: total
				});
			});
			//PackItem//////////////////////////////////////////////////////////////////////
			//route.delete('/rest/PackItem/:contact_id',  async function(ctx,contact_id) {
			socket.on('/delete/PackItem', async function( data, callback ) {				
				var contact = await models.PackItem.findById(data.id); //.then(function(packitem) {
				contact.destroy();
				callback({
					data: [],
					message: "delete PackItem ok"
				});
			}); //delete
			//route.post('/rest/PackItem', async function(ctx,next) {
			socket.on('/post/PackItem', async function( data, callback ) {				
				var contact = await models.PackItem.create(data)
				var pack = await contact.getItem();
				contact.dataValues["Item"] = pack;
				callback({
					data: contact,
					message: "create UsePack ok"
				});
			});
			//route.put('/rest/PackItem/:id',async  function(ctx,next) {
			socket.on('/put/PackItem', async function( data, callback ) {				
				console.log(data.id);
				var packitem = await models.PackItem.findById(data.id, {
					include: [{
						model: models.Item,
					}],
				}); //.then(function(packitem) {
				console.log("==============================");
				console.log(packitem);
				packitem.update(data);
				packitem.Item.save();
				packitem.save();
				console.log(packitem);
				callback({
					data: packitem,
					message: "update packitem ok"
				});
			}); //update
			// route.put('/rest/PackItem/:id', function*(id) {
			// 	var contact = await models.PackItem.findById(id); //.then(function(packitem) {
			// 	contact.update(data);
			// 	contact.save();
			// 	callback({
			// 		data: contact,
			// 		message: "update  PackItem ok"
			// 	};
			// }));
			//route.get('/rest/PackItem', async function(ctx,next) {
			socket.on('/get/PackItem', async function( data, callback ) {	
				console.log("/get/PackItem");			
				console.log(data);
				var start = data.start;
				var limit = data.limit;
				let search="";
				if(data.search) search = data.search;
				var w = {
					pack_id: data.pack_id
				};
				var datas = await models.PackItem.findAll({
					attributes: [
						[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
					],
					where: w
				})
				var total = datas[0].dataValues.total;
				console.log("total=" + total);
				var contacts = await models.PackItem.findAll({
					where: w,
					limit: limit,
					offset: start,
					include: [{
						model: models.Item,
					}],
				})
				callback({
					data: contacts,
					total: total
				});
			});
			//Pack
			//route.post('/rest/Pack', async function(ctx,next) {
			socket.on('/post/Pack', async function( data, callback ) {				
				var data = await models.Pack.create(data);
				callback({
					data: data,
					message: "create pack ok"
				});
			});
			//route.get('/rest/Pack', async function(ctx,next) {
			socket.on('/get/Pack', async function( data, callback ) {				
				console.log(data);
				var start = data.start;
				var limit = data.limit;
				var search = data.search;
				var w = null;
				if (search && search != "") {
					w = {
						name: {
							$like: "%" + search + "%"
						},
					};
				} else {
					w = {};
				}
				console.log(w);
				var datas = await models.Pack.findAll({
					attributes: [
						[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
					],
					where: w
				});
				var total = datas[0].dataValues.total;
				console.log("total=" + total);
				var contacts = await models.Pack.findAll({
					where: w,
					limit: limit,
					offset: start,
					order: [['id','DESC']]
				});
				if (contacts.length > 0) {
					callback({
						data: contacts,
						total: total
					});
				} else {
					callback({
						data: contacts,
						total: 0
					});
				}
			});
			//Item
			//route.post('/rest/Item', async function(ctx,next) {
			socket.on('/post/Item', async function( data, callback ) {				
				var data = await models.Item.create(data);
				callback({
					data: data,
					message: "create item ok"
				});
			});
			//route.get('/rest/Item', async function(ctx,next) {
			socket.on('/get/Item', async function( data, callback ) {				
				console.log(data);
				var start = data.start;
				var limit = data.limit;
				var search = data.search;
				var w = null;
				if (search && search != "") {
					w = {
						name: {
							$like: "%" + search + "%"
						},
					};
				} else {
					w = {};
				}
				console.log(w);
				var datas = await models.Item.findAll({
					attributes: [
						[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
					],
					where: w
				});
				var total = datas[0].dataValues.total;
				console.log("total=" + total);
				var contacts = await models.Item.findAll({
					where: w,
					limit: limit,
					offset: start,
					order: [['id','DESC']]
				});
				if (contacts.length > 0) {
					callback({
						data: contacts,
						total: total
					});
				} else {
					callback({
						data: contacts,
						total: 0
					});
				}
			});
						//  socket.on('/get/Item', async function( data, callback ) {
						// 		console.log(data)
						// 		var start = data.start;
						// 		var limit = data.limit;
						// 		var search = data.search;
						// 		var w = {
						// 			//contact_id:data.contact_id
						// 		};
						// 		var datas = await models.Item.findAll({
						// 			attributes: [
						// 				[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
						// 			],
						// 			where: w
						// 		})
						// 		var total = datas[0].dataValues.total;
						// 		console.log("total=" + total);
						// 		var contacts = await models.Item.findAll({
						// 			where: w,
						// 			limit: limit,
						// 			offset: start
						// 		})
						// 	callback( { 'success': true ,
						// 			data: contacts,
						// 			total: total} );
						// });
						// socket.on('/get/UsePack', async function( data, callback ) {
						// 		console.log(data)
						// 		var start = data.start;
						// 		var limit = data.limit;
						// 		var search = data.search;
						// 		var w = {
						// 			contact_id:data.contact_id
						// 		};
						// 		var datas = await models.UsePack.findAll({
						// 			attributes: [
						// 				[models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
						// 			],
						// 			where: w
						// 		})
						// 		var total = datas[0].dataValues.total;
						// 		console.log("total=" + total);
						// 		var contacts = await models.UsePack.findAll({
						// 			where: w,
						// 			limit: limit,
						// 			offset: start,
						// 			include: [{
						// 				model: models.Pack,
						// 			}],
						// 		})
						// 	callback( { 'success': true ,
						// 			data: contacts,
						// 			total: total} );
						// });

			socket.on('enterRoom', function( tableId ) {
				if( typeof players[socket.id] !== 'undefined' && players[socket.id].room === null ) {
					// Add the player to the socket room
					socket.join( 'table-' + tableId );
					// Add the room to the player's data
					players[socket.id].room = tableId;
				}
			});

		});
	}
);

