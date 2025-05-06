// 문제 설명
// 문자열 my_string과 정수 n이 매개변수로 주어질 때,
// my_string에 들어있는 각 문자를 n만큼 반복한 문자열을 return 하도록 solution 함수를 완성해보세요.

// 제한사항
// 2 ≤ my_string 길이 ≤ 5
// 2 ≤ n ≤ 10
// "my_string"은 영어 대소문자로 이루어져 있습니다.

// 입출력 예
// my_string	n	result
// "hello"	3	"hhheeellllllooo"

// 주어진 함수
function solution(my_string, n) {
    var answer = '';
    return answer;
}

// 풀이
function solution(my_string, n) {
    var answer = '';
    for(var i = 0; i < my_string.length; i++){
        answer += my_string[i].repeat(n);
    }
    return answer;
}

// map()을 활용한 풀이방식
function solution(my_string, n) {
    var answer = [...my_string].map(item => item.repeat(n)).join("");
    // 1. map()을 사용하기위해 [...]를 사용하여 배열데이터로 변경
    // 2. map을 활용하여 item을 n번만큼 repeat
    // 3. join("")을 통하여 구분없는 하나의 문자열로 합칩니다.
    return answer;
}