// 문제 설명
    // 어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다.
    // 예를 들어 "AB"는 1만큼 밀면 "BC"가 되고, 3만큼 밀면 "DE"가 됩니다. "z"는 1만큼 밀면 "a"가 됩니다.
    // 문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.

// 제한 조건
    // 공백은 아무리 밀어도 공백입니다.
    // s는 알파벳 소문자, 대문자, 공백으로만 이루어져 있습니다.
    // s의 길이는 8000이하입니다.
    // n은 1 이상, 25이하인 자연수입니다.

// 입출력 예
    // s	    n	result
    // "AB"	    1	"BC"
    // "z"	    1	"a"
    // "a B z"	4	"e F d"

// 주어진함수
function solution(s, n) {
    var answer = '';
    return answer;
}

// 풀이
function solution(s, n) {
    var answer = '';
    
    for(var i = 0; i < s.length; i++){
      var char = s[i];
      var charNum = char.charCodeAt();
        
      if(charNum >= 65 && 90 >= charNum){
          charNum = ((charNum + n - 65) % 26) + 65;
      }else if(charNum >= 97 && 122 >- charNum){
          charNum = ((charNum + n - 97) % 26) + 97;
      }
      
      answer += String.fromCharCode(charNum);
  }
    return answer;
}
// charCodeAt() 메서드는 문자열에서 지정된 인덱스에 있는 문자의 유니코드 값을 반환합니다.

// String.fromCharCode() 메서드는 유니코드를 사용해 문자열을 생성합니다
// 이 메서드는 정적 메서드이기 때문에 String 객체의 인스턴스가 아니라 String 객체 자체에서 호출해야 합니다.
// 이 메서드에는 숫자로 된 유니코드 값을 인자로 받습니다.

