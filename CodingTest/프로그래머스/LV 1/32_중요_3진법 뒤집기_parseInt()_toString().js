// 문제 설명
// 자연수 n이 매개변수로 주어집니다. n을 3진법 상에서 앞뒤로 뒤집은 후,
// 이를 다시 10진법으로 표현한 수를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// n은 1 이상 100,000,000 이하인 자연수입니다.
// 입출력 예
// n	result
// 45	7
// 125	229


// 입출력 예 설명

// 입출력 예 #1

// 답을 도출하는 과정은 다음과 같습니다.
// n (10진법)	n (3진법)	앞뒤 반전(3진법)	10진법으로 표현
// 45	1200	0021	7
// 따라서 7을 return 해야 합니다.

// 입출력 예 #2

// 답을 도출하는 과정은 다음과 같습니다.
// n (10진법)	n (3진법)	앞뒤 반전(3진법)	10진법으로 표현
// 125	11122	22111	229
// 따라서 229를 return 해야 합니다.

// 주어진 함수
function solution(n) {
    var answer = 0;
    return answer;
}

// 풀이
// 변수n을 3진법으로 변환
function base3(n) {
    var result = '';
    while (n > 0) { // Math.floor(내림)한 (n/3)이 0보다 작다면 반복문 종료
      result = (n % 3) + result;
      n = Math.floor(n / 3);
    }
    return result;
}

function solution(n) {
    var base10 = 0;
    var answer = base3(n).split("").join(""); // n이 125일때 뒤집어야 하지만 반복문을 0부터 시작하기 위해 reverse는 사용하지 않음
    for(var i = 0; i < answer.length; i++){
      base10 += answer[i] * (3**i);
    }
    return base10;
}

// reverse()를 사용하려면? - 문제에 따른 코드 이해를 위해서?
function solution(n) {
    var base10 = 0;
    var answer = base3(n).split("").reverse().join(""); // 주어진 11122를 뒤집어서 22111로 반환
    for(var i = answer.length - 1; i >= 0; i--){
      base10 += answer[i] * (3**(answer.length-1-i));
    }
    return base10;
}

// 이해를 돕기위한 for문 순서 (n이 125일때)
// (1)*(3**(5-1-4)) = 1*(3**0) = 1
// (1)*(3**(5-1-3)) = 1*(3**1) = 3
// (1)*(3**(5-1-2)) = 1*(3**2) = 9
// (2)*(3**(5-1-1)) = 2*(3**3) = 54
// (2)*(3**(5-1-0)) = 2*(3**4) = 162
// 모두 합치면 229

// 거듭제곱 주의점
// 3**0 = 1입니다
// 3 * (3**0) = 3입니다
// 어떤 수에 0을 거듭제곱으로 곱하면 값은 항상 1이 됩니다.

// 개선된 풀이방식
function solution(n) {
  var answer = parseInt(n.toString(3).split("").reverse().join(""), 3);
  return answer;
}

// 해설
// toString은 숫자를 문자열로 변환해주는 메서드입니다.
// toString(3)처럼 인자로 3을 전달하면 toString메서드는 전달받은 변수(문자열로 바꿀 숫자)가 3진법이라고 이해합니다.

// parseInt는 문자열을 정수로 변환해주는 메서드입니다;
// parseInt(... ,3)처럼 두번째 인자로 3을 입력시 parseInt는 주어진 문자열을 3진법 숫자로 인식한뒤, 10진법으로 변환해줍니다.

// 따라서 n = 125일때
// 1. toString(3)을 통해 3진법 "11122"로 변환
// 2. split("")를 통해 ["1", "1", "2", "2", "2"]배열로 변환(reverse를 사용하기 위해)
// 3. reverse()를 통해 ["2", "2", "2", "1", "1"]로 배열을 뒤집음
// 4. join("")를 통해 배열을 "22211"로 합칩니다.
// 5. "22211"을 parseInt(... ,3)의 두번째인자(3)을 통해 바꿀 숫자가 3진법임을 알려준 후 10진법으로 변환합니다.

// 이해를 돕기위한 설명
// parseInt는 항상 10진법 숫자만을 반환합니다.