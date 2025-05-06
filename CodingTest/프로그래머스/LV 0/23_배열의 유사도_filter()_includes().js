// 문제 설명
// 두 배열이 얼마나 유사한지 확인해보려고 합니다.
// 문자열 배열 s1과 s2가 주어질 때 같은 원소의 개수를 return하도록 solution 함수를 완성해주세요.


// 제한사항
// 1 ≤ s1, s2의 길이 ≤ 100
// 1 ≤ s1, s2의 원소의 길이 ≤ 10
// s1과 s2의 원소는 알파벳 소문자로만 이루어져 있습니다
// s1과 s2는 각각 중복된 원소를 갖지 않습니다.

// 입출력 예
// s1	s2	result
// ["a", "b", "c"]	["com", "b", "d", "p", "c"]	2
// ["n", "omg"]	["m", "dot"]	

// 주어진 함수
function solution(s1, s2) {
    var answer = 0;
    return answer;
}

// 풀이
function solution(s1, s2) {
    var answer = s1.filter(item => s2.includes(item));
    return answer.length;
}

// 다른 방식의 풀이
function solution(s1, s2) {
    const a = [...s1, ...s2];
    const b = new Set(a);
    return answer = a.length - b.size;
}

// Set
// ES6에서 추가된 데이터 타입으로
// 중복된 값을 허용하지 않는 데이터 타입입니다.
// Set 객체는 length속성이 존재하지 않기 때문에
// 배열의 갯수를 얻으려면 .size를 사용해야 합니다.