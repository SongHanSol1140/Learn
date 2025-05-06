// 문제 설명
// 정수 배열 numbers가 매개변수로 주어집니다.
// numbers의 원소 중 두 개를 곱해 만들 수 있는 최댓값을 return하도록 solution 함수를 완성해주세요.

// 제한사항
// 0 ≤ numbers의 원소 ≤ 10,000
// 2 ≤ numbers의 길이 ≤ 100

// 입출력 예
// numbers	result
// [1, 2, 3, 4, 5]	20
// [0, 31, 24, 10, 1, 9]	744

// 주어진 함수
function solution(numbers) {
    var answer = 0;
    return answer;
}

// 풀이
function solution(numbers) {
    var a = numbers.sort((a,b) => a - b);
    var answer = a[a.length-1] * a[a.length-2]
    return answer;
}