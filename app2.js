#!/usr/bin/env node
var static = require('./node-static');
var file = new static.Server('./public');
var socket = require('./routes/socket.js');
var debug = require('debug')('express-example');
var models = require("./models");

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
			 //Contact//////////////////////////////////////////////////////////////////////
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
	var contact =await models.Contact.create(data)
	callback({
		data: contact,
		message: "create Contact ok"
	});
});
//route.put('/rest/Contact', async function(ctx,next) {
socket.on('/put/Contact', async function( data, callback ) {			
	var contact = await models.Contact.findById(data.id); //.then(function(packitem) {
	contact.update(data);
	contact.save();
	callback({
		data: contact,
		message: "update  Contact ok"
	});
});
//route.get('/rest/Contact', async function(ctx,next) {
socket.on('/get/Contact', async function( data, callback ) {				
	var start = data.start;
	var limit = data.limit;
	var search = data.search;
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
		order: 'yujifahuo_date DESC'
	})
	callback({
		data: contacts,
		total: total
	});
});
//UsePack//////////////////////////////////////////////////////////////////////
//route.delete('/rest/UsePack/:contact_id', async function(ctx) {
socket.on('/delete/UsePack', async function( data, callback ) {				
	var contact = await models.UsePack.findById(data.contact_id); //.then(function(packitem) {
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
	var contact = await models.PackItem.findById(data.contact_id); //.then(function(packitem) {
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
	var start = data.start;
	var limit = data.limit;
	var search = data.search;
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
		offset: start
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
		offset: start
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

