var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
var input = fs.readFileSync('/Users/songhansol/Desktop/code/Study/Z-백준/javascript/input.txt').toString().trim().split("\r\n");



const num1 = input.shift();

for (let i = 0; i < num1; i++) {
    let answer = '';
    
    const [num2, str] = input[i].split(" ");
    
    for (let j = 0; j < str.length; j++) {
        for (let c = 0; c < num2; c++) {
            answer += str[j];
  	}
    }
    
    console.log(answer);
}
// (O) https://example.com
// (X) https://www.example.com
