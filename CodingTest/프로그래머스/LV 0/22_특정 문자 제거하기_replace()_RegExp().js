// 문제 설명
// 문자열 my_string과 문자 letter이 매개변수로 주어집니다.
// my_string에서 letter를 제거한 문자열을 return하도록 solution 함수를 완성해주세요.

// 제한사항
// 1 ≤ my_string의 길이 ≤ 100
// letter은 길이가 1인 영문자입니다.
// my_string과 letter은 알파벳 대소문자로 이루어져 있습니다.
// 대문자와 소문자를 구분합니다.

// 입출력 예
// my_string	letter	result
// "abcdef"	"f"	"abcde"
// "BCBdbe"	"B"	"Cdbe"

// 주어진 함수
function solution(my_string, letter) {
    var answer = '';
    return answer;
}

// 풀이
function solution(my_string, letter) {
    var answer = my_string.replace(new RegExp(letter,'g'),'');
    return answer;
}

// replace
// 문자열에서 문자열을 원하는 문자열로 바꿀 수 있습니다
// replace( 바뀌기전문자열 , 바꿀문자열 ); 식으로 사용이 가능합니다.