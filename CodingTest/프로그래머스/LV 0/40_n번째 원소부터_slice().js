// 문제 설명
// 정수 리스트 num_list와 정수 n이 주어질 때,
// n 번째 원소부터 마지막 원소까지의 모든 원소를 담은 리스트를 return하도록 solution 함수를 완성해주세요.

// 제한사항
// 2 ≤ num_list의 길이 ≤ 30
// 1 ≤ num_list의 원소 ≤ 9
// 1 ≤ n ≤ num_list의 길이

// 입출력 예
// num_list	n	result
// [2, 1, 6]	3	[6]
// [5, 2, 1, 7, 5]	2	[2, 1, 7, 5]

// 주어진 함수
function solution(num_list, n) {
    var answer = [];
    return answer;
}

// 풀이
function solution(num_list, n) {
    // var answer = num_list.slice(n-1, num_list.length);
    var answer = num_list.slice(n-1); // 두번째 값을 기입하지 않을 경우 자동으로 마지막까지 반환
    return answer;
    
}