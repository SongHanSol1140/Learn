// 문제 설명
// 문자열 배열 strlist가 매개변수로 주어집니다.
// strlist 각 원소의 길이를 담은 배열을 retrun하도록 solution 함수를 완성해주세요.


// 제한사항
// 1 ≤ strlist 원소의 길이 ≤ 100
// strlist는 알파벳 소문자, 대문자, 특수문자로 구성되어 있습니다.

// 입출력 예
// strlist	result
// ["We", "are", "the", "world!"]	[2, 3, 3, 6]
// ["I", "Love", "Programmers."]	[1, 4, 12]

// 주어진 함수
function solution(strlist) {
    var answer = [];
    return answer;
}

// 풀이
function solution(strlist) {
    var answer = [];
    for(var i of strlist){
        answer.push(i.length);
    }
    return answer; // [2, 3, 3, 6]
}

// map을 이용한 풀이
function solution(strlist) {
    return strlist.map(item => item.length); // [2, 3, 3, 6]
}