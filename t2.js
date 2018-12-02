var models = require("./models");
var readStandardFile=require('./readstandard')
var fs=require('fs');
models.sequelize.sync().then(
    ()=>{
        var fc=fs.readFileSync("./2017.6.16标钢入库.xls")
        readStandardFile(fc,"2017.6.16标钢入库.xls");
    }
)