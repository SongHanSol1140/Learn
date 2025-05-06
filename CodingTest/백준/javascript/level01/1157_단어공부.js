// 문제
// 알파벳 대소문자로 된 단어가 주어지면,
// 이 단어에서 가장 많이 사용된 알파벳이 무엇인지 알아내는 프로그램을 작성하시오.
// 단, 대문자와 소문자를 구분하지 않는다.

// 입력
// 첫째 줄에 알파벳 대소문자로 이루어진 단어가 주어진다. 주어지는 단어의 길이는 1,000,000을 넘지 않는다.

// 출력
// 첫째 줄에 이 단어에서 가장 많이 사용된 알파벳을 대문자로 출력한다.
// 단, 가장 많이 사용된 알파벳이 여러 개 존재하는 경우에는 ?를 출력한다.

// 예제 입력 1 
// Mississipi
// 예제 출력 1 
// ?

// 예제 입력 2 
// zZa
// 예제 출력 2 
// Z

// 예제 입력 3 
// z
// 예제 출력 3 
// Z

// 예제 입력 4 
// baaa
// 예제 출력 4 
// A

// 풀이


var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().trim().toUpperCase();
// var input = fs.readFileSync('C:/songhansol/Study/Z-백준/input.txt').toString().trim().toUpperCase();

var keys = {};
for(var i = 0; i < input.length; i++){
    if(keys[input[i]] == undefined){
        keys[input[i]] = 1
    }else{
        keys[input[i]] += 1;
    }
}

// 검증
var checkBox = [];
var maxNum = 0;
var answer = "";
for(item in keys){
    
    if(keys[item] > maxNum){
        maxNum = keys[item];
        checkBox = [];
        checkBox.push(item);
    }else if(keys[item] == maxNum){
        checkBox.push(item);
    }
}
answer = checkBox.length == 1? checkBox[0]: "?";
console.log(answer);



// 개선된 풀이 방식
var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().trim().toUpperCase();
// var input = fs.readFileSync('C:/songhansol/Study/Z-백준/input.txt').toString().trim().toUpperCase();

var charCounts = {};
for (let char of input) {
    charCounts[char] = (charCounts[char] || 0) + 1;
}
var maxCount = Math.max(...Object.values(charCounts));
var mostFrequentChars = Object.keys(charCounts).filter(char => charCounts[char] === maxCount);
console.log(mostFrequentChars.length > 1 ? "?" : mostFrequentChars[0])

