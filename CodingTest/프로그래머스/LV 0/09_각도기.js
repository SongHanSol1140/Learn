// 각에서 0도 초과 90도 미만은 예각, 90도는 직각, 90도 초과 180도 미만은 둔각 180도는 평각으로 분류합니다.
// 각 angle이 매개변수로 주어질 때
// 예각일 때 1, 직각일 때 2, 둔각일 때 3, 평각일 때 4를 return하도록 solution 함수를 완성해주세요.

// 예각 : 0 < angle < 90
// 직각 : angle = 90
// 둔각 : 90 < angle < 180
// 평각 : angle = 180

// 제한사항
// 0 < angle ≤ 180
// angle은 정수입니다.

// 주어진 함수
function solution(angle) {
    var answer = 0;
    return answer;
}

// 풀이
function solution(angle) {
    if(0 < angle && angle < 90){
        var answer = 1;
    }else if(angle == 90){
        var answer = 2;
    }else if(90 < angle && angle < 180){
        var answer = 3;
    }else if(angle == 180){
        var answer = 4;
    }
    return answer;
}

// 오류가 있었던 사항
function solution(angle) {
    if(0 < angle < 90){
        var answer = 1;
    }else if(angle == 90){
        var answer = 2;
    }else if(90 < angle < 180){
        var answer = 3;
    }else if(angle == 180){
        var answer = 4;
    }
    return answer;
}

// 자바스크립트 조건식에서 0 < angle < 90와 같이 두번 비교하는건 불가능함,
// 0 < angle && angle < 90처럼 두번에 나눠서 하나씩 비교해줘야함