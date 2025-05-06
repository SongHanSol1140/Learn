문제 설명
정수 n이 매개변수로 주어질 때 n의 각 자리 숫자의 합을 return하도록 solution 함수를 완성해주세요

제한사항
0 ≤ n ≤ 1,000,000

입출력 예
n	result
1234	10
930211	16

// 주어진 함수
function solution(n) {
    answer = 0;
    return answer;
}

// 풀이
function solution(n) {
    answer = 0;

    var string = (n.toString()).split("");
    for(var i of string){
        answer += Number(i);
    }
    
    return answer;
}

// 개선된 풀이 방식



function solution(n) {
  answer = n.toString().split("").reduce((a, b) => Number(a) + Number(b), 0);
  return answer;
}