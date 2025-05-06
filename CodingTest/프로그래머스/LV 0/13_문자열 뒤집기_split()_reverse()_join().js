// 문제 설명
// 문자열 my_string이 매개변수로 주어집니다.
// my_string을 거꾸로 뒤집은 문자열을 return하도록 solution 함수를 완성해주세요.


// 제한사항
// 1 ≤ my_string의 길이 ≤ 1,000


// 입출력 예
// my_string	return
// "jaron"	"noraj"
// "bread"	"daerb"


// 주어진 함수
function solution(my_string) {
    var answer = '';
    return answer;
}

// 풀이
function solution(my_string) {
    var answer = '';
    var arr = my_string.split("");
    arr.reverse();
    for(var num of arr){
        answer += num;
    }
    return answer;
}

// 개선된 식
function solution(my_string) {
    var answer = '';
    var arr = [...my_string].reverse();
    for(var num of arr){
        answer += num;
    }
    return answer;
}

// 최대압축
function solution(my_string) {
    var answer = [...my_string].reverse().join("");
    return answer;
}