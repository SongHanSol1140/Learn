var fs = require('fs');
var input = fs.readFileSync('/Users/songhansol/Desktop/code/Study/Z-백준/javascript/level01/input.txt').toString().split(' ');
// var input = fs.readFileSync('/dev/stdin').toString().split(' ');
var a = parseInt(input[0]);
var b = parseInt(input[1]);
console.log(a + b);