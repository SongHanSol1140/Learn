// 문제 설명
// 두 정수 a, b와 boolean 변수 flag가 매개변수로 주어질 때,
// flag가 true면 a + b를 false면 a - b를 return 하는 solution 함수를 작성해 주세요.

// 제한사항
// -1000 ≤ a, b ≤ 1,000

// 입출력 예
// a	b	flag	result
// -4	7	true	3
// -4	7	false	-11

// 주어진 함수
function solution(a, b, flag) {
    var answer = 0;
    return answer;
}

// 풀이 1
function solution(a, b, flag) {
    var answer = '';
    if(flag){
        answer = a + b;
    } else{
        answer = a - b;
    }
    return answer;
}
// 풀이 2
function solution(a, b, flag) {
    var answer = 0;
    return answer = flag ? a + b : a - b;
}