// 문제 설명
// 사분면은 한 평면을 x축과 y축을 기준으로 나눈 네 부분입니다.
// 사분면은 아래와 같이 1부터 4까지 번호를매깁니다.

// 2          │         1
//            │         
//            │
// (-3,2)     │      (3,2)
// ───────────┼───────────
// (-3,-2)    │      (3-2)
//            │
//            │
// 3          │         4

// x 좌표와 y 좌표가 모두 양수이면 제1사분면에 속합니다.
// x 좌표가 음수, y 좌표가 양수이면 제2사분면에 속합니다.
// x 좌표와 y 좌표가 모두 음수이면 제3사분면에 속합니다.
// x 좌표가 양수, y 좌표가 음수이면 제4사분면에 속합니다.


// x 좌표 (x, y)를 차례대로 담은 정수 배열 dot이 매개변수로 주어집니다.
// 좌표 dot이 사분면 중 어디에 속하는지 1, 2, 3, 4 중 하나를 return 하도록 solution 함수를 완성해주세요.



// 제한사항
// dot의 길이 = 2
// dot[0]은 x좌표를, dot[1]은 y좌표를 나타냅니다
// -500 ≤ dot의 원소 ≤ 500
// dot의 원소는 0이 아닙니다..

// 입출력 예
// dot	result
// [2, 4]	1
// [-7, 9]	2

// // 주어진 함수
function solution(dot) {
    var answer = 0;
    return answer;
}


// 풀이
function solution(dot) {
    var answer = 0;
    var x = dot[0];
    var y = dot[1];

    if(x > 0) {
        if(y > 0){
            answer = 1;
        } else{
            answer = 4;
        }
    }
    if(x < 0) {
        if(y > 0){
            answer = 2;
        } else{
            answer = 3;
        }
    }

    return answer;
}

// 다른식의 풀이(조건부 연산자)
function solution(dot) {
    // var x = dot[0];
    // var y = dot[1];
    var [x,y] = dot;
    var check = x * y > 0;
        // x * y가 양수일 경우 true를 반환하는 조건식을 생성
    return x > 0 ? (check ? 1: 4) : (check ? 3: 2);
        // x가 양수일 경우 x의 값은
        // x * y가 양수라면 1
        // x * y가 음수라면 4
        
        // x가 음수일 경우 x의 값은
        // x * y가 양수일경우 3
        // x * y가 음수일경우 2
}