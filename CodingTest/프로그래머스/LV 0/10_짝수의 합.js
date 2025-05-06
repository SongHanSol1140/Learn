// 문제 설명
// 정수 n이 주어질 때,
// n이하의 짝수를 모두 더한 값을 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 0 < n ≤ 1000

// 입출력 예
// n	result
// 10	30
// 4	6


// 주어진 함수
function solution(n) {
    var answer = 0;
    return answer;
}

// 풀이
function solution(n) {
    var answer = 0;
    for(i=0; i<=n; i++){
        if(i%2 == 0){
            answer += i;
        }
    }
    return answer;
}

// 개선점
function solution(n) {
    var answer = 0;
    for(i=2; i<=n; i+=2){
        if(i%2 == 0){
            answer += i;
        }
    }
    return answer;
}

// 문제는 짝수만 반환해야되는 상황이기 때문에 i++를 i+=2로 바꿔서 반복횟수 자체를 줄일 수 있음,
// 