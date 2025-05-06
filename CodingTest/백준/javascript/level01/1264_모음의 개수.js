// 문제
// 영문 문장을 입력받아 모음의 개수를 세는 프로그램을 작성하시오.
// 모음은 'a', 'e', 'i', 'o', 'u'이며 대문자 또는 소문자이다.

// 입력
// 입력은 여러 개의 테스트 케이스로 이루어져 있으며,
// 각 줄마다 영어 대소문자, ',', '.', '!', '?', 공백으로 이루어진 문장이 주어진다. 각 줄은 최대 255글자로 이루어져 있다.

// 입력의 끝에는 한 줄에 '#' 한 글자만이 주어진다.

// 출력
// 각 줄마다 모음의 개수를 세서 출력한다.

// 예제 입력 1 
// How are you today?
// Quite well, thank you, how about yourself?
// I live at number twenty four.
// #

// 예제 출력 1 
// 7
// 14
// 9

var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
var input = fs.readFileSync('C:/songhansol/Study/Z-백준/level01/input.txt').toString().split('\n');
input = input.slice(0, input.length - 1);

var a = "aeiou";
for(var i = 0; i < input.length; i++){
    var answer = input[i].toLowerCase();
    answer = answer.split("").filter(item => a.includes(item));
    console.log(answer.length);
}

// 해당 문제는 풀이 과정에 문제가 없는걸로 보이는데
// 아무리 검토해봐도 백준에서 nodejs를 받지않는걸로보임
// 다른 사용자의 nodejs 합격기록자체가 존재하지않음