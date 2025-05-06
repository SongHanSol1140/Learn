// 문제 설명
// 정수가 담긴 배열 array와 정수 n이 매개변수로 주어질 때,
// array에 n이 몇 개 있는 지를 return 하도록 solution 함수를 완성해보세요.

// 제한사항
// 1 ≤ array의 길이 ≤ 100
// 0 ≤ array의 원소 ≤ 1,000
// 0 ≤ n ≤ 1,000

// 입출력 예
// array	n	result
// [1, 1, 2, 3, 4, 5]	1	2
// [0, 2, 3, 4]	1	0


// 주어진 함수
function solution(array, n) {
    var answer = 0;
    return answer;
}


// 풀이
function solution(array, n) {
    var answer = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === n) { 
          answer++;
        }
    }
    return answer;
}

// for of를 이용한 풀이
function solution(array, n) {
    var answer = 0;
    for (var i of array) {
        if (i == n) { 
          answer++;
        }
    }
    return answer;
}

// 주어진 배열 array를 for of문으로 하여금 순회시킵니다.
// for of문에서 i는 array[0]부터 끝까지 배열 개수만큼 순회
// 이때, i값이(array의 속성값)이 n과 똑같을때 answer의 개수를 1씩 늘려준다.