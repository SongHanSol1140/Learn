// 문제 설명
// 배열 arr가 주어집니다. 배열 arr의 각 원소는 숫자 0부터 9까지로 이루어져 있습니다.
// 이때, 배열 arr에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하려고 합니다.
// 단, 제거된 후 남은 수들을 반환할 때는 배열 arr의 원소들의 순서를 유지해야 합니다. 예를 들면,

// arr = [1, 1, 3, 3, 0, 1, 1] 이면 [1, 3, 0, 1] 을 return 합니다.
// arr = [4, 4, 4, 3, 3] 이면 [4, 3] 을 return 합니다.
// 배열 arr에서 연속적으로 나타나는 숫자는 제거하고 남은 수들을 return 하는 solution 함수를 완성해 주세요.

// 제한사항
// 배열 arr의 크기 : 1,000,000 이하의 자연수
// 배열 arr의 원소의 크기 : 0보다 크거나 같고 9보다 작거나 같은 정수

// 입출력 예

// arr	answer
// [1,1,3,3,0,1,1]	[1,3,0,1]
// [4,4,4,3,3]	[4,3]


// 입출력 예 설명

// 입출력 예 #1,2
// 문제의 예시와 같습니다.

// 주어진 함수
function solution(arr){
    var answer = [];
    return answer;
}

// 풀이 1 = 시간 초과로 프로그래머스 문제해결 불가 - 결과는 같음
function solution(arr){
    var answer = [];

    for(var i = 0; i < arr.length; i++){
        if(arr[i] !== arr[i-1]){
            answer.push(arr[i]);
        }
    }

    return answer;
}

// 풀이 2 - 배열이 길어졌을때 시간 복잡도를 줄이는 방법
function solution(arr) {
    var answer = [];
    var prevNum;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prevNum) {
            answer.push(arr[i]);
        }
        prevNum = arr[i];
    }

    return answer;
}

// 풀이 1에서 if(arr[i] !== arr[i-1])의
// !== arr[i-1]로 인해 인덱스에 한번 더 접근하므로 시간이 초과햇다고 판단
// prevNum(이전 배열의 값)를 할당하여 인덱스에 접근할 필요를 없게 합니다.