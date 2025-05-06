// 문제 설명
// 정수가 담긴 리스트 num_list가 주어질 때,
// 리스트의 길이가 11 이상이면 리스트에 있는 모든 원소의 합을 10 이하이면 모든 원소의 곱을 return하도록 solution 함수를 완성해주세요.

// 제한사항
// 2 ≤ num_list의 길이 ≤ 20
// 1 ≤ num_list의 원소 ≤ 9

// 입출력 예
// num_list	result
// [3, 4, 5, 2, 5, 4, 6, 7, 3, 7, 2, 2, 1]	51
// [2, 3, 4, 5]	120

// 주어진 함수
function solution(num_list) {
    var answer = 0;
    return answer;
}

// 풀이
function solution(num_list) {
    var answer = num_list.length >= 11 ? num_list.reduce((a,b) => a + b): num_list.reduce((a,b) => a * b);
    return answer;
}