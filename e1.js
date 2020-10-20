if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('2017.6.16标钢入库.xls');
console.log(workbook);
