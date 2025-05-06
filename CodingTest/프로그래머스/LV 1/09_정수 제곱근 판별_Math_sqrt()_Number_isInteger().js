// 문제 설명
// 임의의 양의 정수 n에 대해, n이 어떤 양의 정수 x의 제곱인지 아닌지 판단하려 합니다.
// n이 양의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고,
// n이 양의 정수 x의 제곱이 아니라면 -1을 리턴하는 함수를 완성하세요.

// 제한 사항
// n은 1이상, 50000000000000 이하인 양의 정수입니다.

// 입출력 예
// n	return
// 121	144
// 3	-1

// 주어진 함수
function solution(n) {
    var answer = 0;
    return answer;
}

// 풀이
function solution(n) {
    var answer = 0;

    var x = Math.sqrt(n); // x는 n의 제곱근입니다.

    if(Number.isInteger(x)){ // x가 정수라면
        x++;
        answer = x*x;
    }else{
        answer = -1;
    }
    return answer;
}