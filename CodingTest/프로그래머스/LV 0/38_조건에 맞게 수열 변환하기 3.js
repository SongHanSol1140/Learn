// 문제 설명
// 정수 배열 arr와 자연수 k가 주어집니다.

// 만약 k가 홀수라면 arr의 모든 원소에 k를 곱하고, k가 짝수라면 arr의 모든 원소에 k를 더합니다.

// 이러한 변환을 마친 후의 arr를 return 하는 solution 함수를 완성해 주세요.

// 제한사항
// 1 ≤ arr의 길이 ≤ 1,000,000
// 1 ≤ arr의 원소의 값 ≤ 100
// 1 ≤ k ≤ 100

// 입출력 예
// arr	k	result
// [1, 2, 3, 100, 99, 98]	3	[3, 6, 9, 300, 297, 294]
// [1, 2, 3, 100, 99, 98]	2	[3, 4, 5, 102, 101, 100]


// 주어진 함수
function solution(arr, k) {
    var answer = [];
    return answer;
}
// 풀이
function solution(arr, k) {
    var answer = [];
    if(k % 2 == 1){
        for(var i of arr){
            answer.push(i * k);
        }
    }else if(k % 2 == 0){
        for(var i of arr){
            answer.push(i + k);
        }
    }
    return answer;
}

// 개선된 풀이방식
function solution(arr, k) {
    var answer = arr.map(v => k % 2 ? v * k : v + k);
    return answer;
}

// 자바스크립트에서 숫자 0은 거짓, 0을 제외한 모든 수는 참으로 판단합니다.