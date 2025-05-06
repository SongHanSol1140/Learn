// 문제 설명
// 문자열 my_string과 정수 k가 주어질 때,
// my_string을 k번 반복한 문자열을 return 하는 solution 함수를 작성해 주세요.

// 제한사항
// 1 ≤ my_string의 길이 ≤ 100
// my_string은 영소문자로만 이루어져 있습니다.
// 1 ≤ k ≤ 100

// 입출력 예
// my_string	k	result
// "string"	3	"stringstringstring"
// "love"	10	"lovelovelovelovelovelovelovelovelovelove"

// 주어진 함수
// function solution(my_string, k) {
//     var answer = '';
//     return answer;
// }

// 풀이
function solution(my_string, k) {
    var answer = my_string.repeat(k);
    return answer;
}