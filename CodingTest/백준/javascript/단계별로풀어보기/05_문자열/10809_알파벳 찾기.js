// 문제
// 알파벳 소문자로만 이루어진 단어 S가 주어진다. 각각의 알파벳에 대해서,
// 단어에 포함되어 있는 경우에는 처음 등장하는 위치를, 포함되어 있지 않은 경우에는 -1을 출력하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 단어 S가 주어진다. 단어의 길이는 100을 넘지 않으며, 알파벳 소문자로만 이루어져 있다.

// 출력
// 각각의 알파벳에 대해서, a가 처음 등장하는 위치, b가 처음 등장하는 위치, ... z가 처음 등장하는 위치를 공백으로 구분해서 출력한다.

// 만약, 어떤 알파벳이 단어에 포함되어 있지 않다면 -1을 출력한다. 단어의 첫 번째 글자는 0번째 위치이고, 두 번째 글자는 1번째 위치이다.

// 예제 입력 1 
// baekjoon
// 예제 출력 1 
// 1 0 -1 -1 2 -1 -1 -1 -1 4 3 -1 -1 7 5 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1



// 풀이1
var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString();
var input = fs.readFileSync('C:/songhansol/Study/Z-백준/javascript/input.txt').toString();

var answer = [];

// 아스키코드 a부터 b까지 순회
for(let i = 97; i<= 122; i++){
    // indexOF는 해당값이 잇을시 인덱스번호를, 없을시 -1을 반환함
    answer.push(input.indexOf(String.fromCharCode(i)));
}

console.log(answer.join(" "));






// 풀이2
var fs = require('fs');
// var input = fs.readFileSync('/dev/stdin').toString().trim().split("\n");
var input = fs.readFileSync('C:/songhansol/Study/Z-백준/javascript/input.txt').toString();


// 알파벳 소문자 개수 (26개)
// 결과를 저장할 배열을 -1로 초기화
const alphabetArray  = Array(26).fill(-1);

// 문자열을 순회하며 각 알파벳의 위치를 저장
for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const charIndex = char.charCodeAt(0) - 97; // a의 아스키코드 = 97 => positions의 인덱스 계산

    // 처음에만 위치 저장 => 같은 알파뱃이 두번나오면 제외함
    if (alphabetArray [charIndex] === -1) {
        alphabetArray [charIndex] = i;
    }
}

// 결과 출력
console.log(alphabetArray .join(' '));
