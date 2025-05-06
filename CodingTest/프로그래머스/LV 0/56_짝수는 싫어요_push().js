// 문제 설명
// 정수 n이 매개변수로 주어질 때,

// n 이하의 홀수가 오름차순으로 담긴 배열을 return하도록 solution 함수를 완성해주세요.

// 제한사항
// 1 ≤ n ≤ 100

// 입출력 예
// n	result
// 10	[1, 3, 5, 7, 9]
// 15	[1, 3, 5, 7, 9, 11, 13, 15]

// 주어진 함수
function solution(n) {
    var answer = [];
    return answer;
}

// 풀이 1.
function solution(n) {
    var answer = [];
    for(var i = 0; i <= n; i++){
        if(i % 2 !== 0){
            answer.push(i);
        }
    }
    return answer;
}
// 풀이 2. 풀이 1의 코드를 줄임
function solution(n) {
    var answer = [];
    for(var i = 1; i <= n; i+=2) answer.push(i);
    return answer;
}
