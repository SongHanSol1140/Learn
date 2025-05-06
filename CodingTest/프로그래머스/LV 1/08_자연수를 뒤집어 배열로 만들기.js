문제 설명
자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

제한 조건
n은 10,000,000,000이하인 자연수입니다.

입출력 예
n	return
12345	[5,4,3,2,1]

// 주어진 함수
function solution(n) {
    var answer = [];
    return answer;
}

// map 함수를 사용한 방법
function solution(n) {
    var answer = n.toString().split("").sort((a,b) => b - a).map(Number);
    return answer;
}

// reduce를 사용해도 가능합니다.
function solution(n) {
    const answer = n.toString().split("").reverse().join("").split("").reduce((a,b) => [...a, Number(b)], []);
    return answer;
}