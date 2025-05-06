// 문제 설명
// 영어에선 a, e, i, o, u 다섯 가지 알파벳을 모음으로 분류합니다.
// 문자열 my_string이 매개변수로 주어질 때 모음을 제거한 문자열을 return하도록 solution 함수를 완성해주세요.

// 제한사항
// my_string은 소문자와 공백으로 이루어져 있습니다.
// 1 ≤ my_string의 길이 ≤ 1,000

// 입출력 예
// my_string	result
// "bus"	"bs"
// "nice to meet you"	"nc t mt y"

// 주어진 함수
function solution(my_string) {
    var answer = "";
    return answer;
}

// 풀이 1. 기본적인 반복문을 사용한 방법
function solution(my_string) {
    var min_string = "aeiou";
    var answer = "";

    for (var i = 0; i < my_string.length; i++) {
        if (!min_string.includes(my_string[i])) {
            answer += my_string[i];
        }
    }

    return answer;
}

// 풀이 2. filter메서드 사용
function solution(my_string) {
    var answer = "";
    var min_string = "aeiou";
    var answer = my_string.split('').filter(item => !min_string.includes(item));
    // 1. 문자열 my_string에 split()을 이용하여 배열로 변환합니다.
    // 2. 생성된 배열에 filter로 min_string이 포함되지 않은 배열만 출력하도록 만듭니다.
    return answer.join('');
    // 3. 그렇게 생성된 answer 배열을 하나의 문자열로 합칩니다.
}

// 풀이 3. 정규식을 사용한 방법
function solution(my_string) {
    return my_string.replace(/[aeiou]/g, '');
}





