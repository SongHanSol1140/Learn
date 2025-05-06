// 문제 설명
// 정수 배열 numbers가 매개변수로 주어집니다.
// numbers의 원소의 평균값을 return하도록 solution 함수를 완성해주세요.

// 제한사항
// 0 ≤ numbers의 원소 ≤ 1,000
// 1 ≤ numbers의 길이 ≤ 100
// 정답의 소수 부분이 .0 또는 .5인 경우만 입력으로 주어집니다.

// 입출력 예
// numbers	result
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]	5.5
// [89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99]	94.0

// 주어진 함수
function solution(numbers) {
    var answer = 0;
    return answer;
}

// 풀이
function solution(numbers) {
    var answer = 0;
    var a = 0;
    for(i=0; i<numbers.length; i++){
        a += numbers[i];
    }
    return answer = a/numbers.length;
}

// 함수 개선, for of
function solution(numbers) {
    var answer = 0;
    for(i of numbers) {
        answer += i;
    }
    return answer / numbers.length;

}
// 배열 numbers를 순회하는 i라는 변수
// i는 numbers의 배열을 전부 순회함
// 모든 i값을 answer에 더한후 평균값을 구하기위해 배열의 개수만큼 나눈다