"use strict";
var XLSX = require('xlsx');
var csv = require('csv');
var fs=require('fs');
var models = require("./models");
function readStandardFile(fc,filename,callback){
    var book = XLSX.read(fc, {type:"buffer"})
    const sheetNames = book.SheetNames; 
    const table0 = book.Sheets[sheetNames[0]]
    var table = XLSX.utils.sheet_to_csv(table0)
    csv.parse(table, function(err, data){
        readArr(data,filename,callback);
    });
}
function readArr(lines,filename,callback){
    //console.log(lines)
    var nrows=lines.length
    var begin=false;
    let dan=[];
    let onedan;
    for(var i in lines)
    {
        var cells=lines[i]
        if (cells[0]==="其他入库单")
            if (!begin){
                begin=true
                onedan=[]
            }
            else{
                //finish
                dan.push(onedan)
                onedan=[]
            }
        else{
            if (begin)
                onedan.push(cells)
            else
                ;
        }
    }
    // logging.info(onedan)
    if (onedan.length>0){
        dan.push(onedan)
    }
    //console.log(dan)
    var rs=[]
    for(var one in dan){
        var r=treatOne(dan[one],filename)
        if(r!=null){ 
            rs.push(r)
        }
    }
    todb(rs,callback)
    return rs
}    
function  todb(rs,callback) {
    console.log("todb")
    for(var i in rs){
        var r=rs[i];
        todbOne(r,callback)
    }
}
async function  todbOne(r,callback) {
    // body...
    console.log(r);
    var w = {
            name: r.name
            };
    console.log(w);
    var datas = await models.Pack.findAll({
        where: w
    })
    let pack;
    if (datas.length>0){//find
        pack=datas[0];
    }
    else{
        pack = await models.Pack.create(r);
        callback({result:[{id:pack.id,name:pack.name}]})
    }
    for(var i in r.items){
        //console.log(r.items[i])
        //var pi=savePackItem(r.items[i]);
        var item=r.items[i];
        w = {
            name: item.name
            };
        datas = await models.Item.findAll({
            where: w
        })
        console.log(datas)
        let rec1
        if (datas.length>0){//find
            rec1=datas[0];
        }    
        else{
            rec1 = await models.Item.create(item);
        }
        console.log("the item==================")
        console.log(rec1);
        var rec = await models.PackItem.create({pack_id:pack.id,item_id:rec1.id,ct:1,quehuo:false});//add packitem
    }
}

function treatOne(rows,fn){
    //console.log("================================")
    //console.log(rows)
    var r=null
    var beizhu=rows[1][7]
    if (beizhu.substr(0,2)=="CS" || beizhu.substr(0,2)=="ON"){
        var name=rows[1][7]+"_"+fn
        var d={}//Pack()
        d.name=rows[1][7]+"_"+fn
        //d.save()
        var n=rows.length;
        var items=rows.slice(4,4+n-4-3);
        d["items"]=[];
        for(var i in items){
            var item={}
            item.bh=items[i][1]
            item.name=items[i][2]+" "+items[i][1]
            item.guige=items[i][3]
            item.danwei=items[i][4]
            item.ct=items[i][5]
            d["items"].push(item);
        }
        r=d;
    }
    return r
}
// models.sequelize.sync().then(
//     ()=>{
//         var fc=fs.readFileSync("./2017.6.16标钢入库.xls")
//         readStandardFile(fc,"2017.6.16标钢入库.xls");
//     }
// )
module.exports = readStandardFile;