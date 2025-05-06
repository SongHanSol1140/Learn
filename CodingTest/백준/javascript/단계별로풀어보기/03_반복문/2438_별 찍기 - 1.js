// 별 찍기 - 1
 
// 시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
// 1 초	128 MB	303790	187284	155259	62.303%
// 문제
// 첫째 줄에는 별 1개, 둘째 줄에는 별 2개, N번째 줄에는 별 N개를 찍는 문제

// 입력
// 첫째 줄에 N(1 ≤ N ≤ 100)이 주어진다.

// 출력
// 첫째 줄부터 N번째 줄까지 차례대로 별을 출력한다.

// 예제 입력 1 
// 5
// 예제 출력 1 
// *
// **
// ***
// ****
// *****


var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString();
var input = fs.readFileSync('C:/songhansol/Study/Z-백준/javascript/input.txt').toString();
var num = Number(input);
var answer = "";

for(var i = 1; i <= num; i++){
    answer = "";
    for(var j = 1; j <= i; j++){
        answer += '*';
    }
    console.log(answer);
}