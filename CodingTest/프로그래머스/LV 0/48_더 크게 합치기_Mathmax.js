// 연산 ⊕는 두 정수에 대한 연산으로 두 정수를 붙여서 쓴 값을 반환합니다. 예를 들면 다음과 같습니다.

// 12 ⊕ 3 = 123
// 3 ⊕ 12 = 312
// 양의 정수 a와 b가 주어졌을 때, a ⊕ b와 b ⊕ a 중 더 큰 값을 return 하는 solution 함수를 완성해 주세요.

// 단, a ⊕ b와 b ⊕ a가 같다면 a ⊕ b를 return 합니다.

// 제한사항
// 1 ≤ a, b < 10,000

// 입출력 예
// a	b	result
// 9	91	991
// 89	8	898

// 주어진 함수
function solution(a, b) {
    var answer = 0;
    return answer;
}

// 풀이
function solution(a, b) {
    var answer = 0;

    sum1 = Number(a.toString()+b.toString());
    sum2 = Number(b.toString()+a.toString());
    if(sum1 >= sum2){
        answer = sum1;
    }else if(sum1 < sum2){
        answer = sum2;
    }

    return answer;
}

// 개선된 풀이방식
function solution(a, b) {
    var answer = Number(a+""+b) >= Number(b+""+a) ? Number(a+""+b): Number(b+""+a);
    return answer;
}

// Math.max 함수를 이용한 풀이방식
function solution(a, b) {
    var answer = Math.max(Number(a+""+b),Number(b+""+a));
    return answer;
}