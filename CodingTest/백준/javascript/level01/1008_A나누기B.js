var fs = require("fs");
var input = fs.readFileSync('/dev/stdin').toString().split(' ');
// var input = fs.readFileSync('C:/songhansol/Study/Z-백준/level01/input.txt').toString().split(' ');
var a = parseInt(input[0]);
var b = parseInt(input[1]);
console.log(a / b);