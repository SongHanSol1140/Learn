// 문제 설명
// 대문자와 소문자가 섞여있는 문자열 s가 주어집니다.
// s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요.
// 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.

// 예를 들어 s가 "pPoooyY"면 true를 return하고 "Pyy"라면 false를 return합니다.

// 제한사항
// 문자열 s의 길이 : 50 이하의 자연수
// 문자열 s는 알파벳으로만 이루어져 있습니다.

// 입출력 예
// s	answer
// "pPoooyY"	true
// "Pyy"	false

// 입출력 예 설명
// 입출력 예 #1
// 'p'의 개수 2개, 'y'의 개수 2개로 같으므로 true를 return 합니다.

// 입출력 예 #2
// 'p'의 개수 1개, 'y'의 개수 2개로 다르므로 false를 return 합니다.

// 주어진 함수
function solution(s){
    var answer = true;
    return answer;
}

// 풀이
function solution(s){
    var split = s.split("");

    var a = 0;
    var b = 0;
    
    for(var i of split){
        i = i.toLowerCase();

        if(i === "p"){
            a++;
        }
        if(i === "y"){
            b++;
        }
    }
    
    return a === b;
}

// 다른 방식으로 코드를 줄여보면
function solution(s){
    var answer = s.toLowerCase().split("p").length == s.toLowerCase().split("y").length;
    return answer;
}

// match를 이용한 정규식 해결방식
function solution(s){
    var answer = s.toLowerCase().match(/p/g).length == s.toLowerCase().match(/y/g).length;
    return answer;
}
var answer = s.match(/p/ig).length == s.match(/y/ig).length;

// ig는 대소문자 구별 없이 조회한다는 정규 표현식입니다.