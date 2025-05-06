// 문제 설명
// 단어 s의 가운데 글자를 반환하는 함수, solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

// 재한사항
// s는 길이가 1 이상, 100이하인 스트링입니다.

// 입출력 예
// s	return
// "abcde"	"c"
// "qwer"	"we"


// 주어진 함수
function solution(s) {
    var answer = '';
    return answer;
}

// 풀이
function solution(s) {
    var answer = '';
    var snum = Math.ceil(s.length/2);

    if(s.length % 2 == 0){
        answer += s[snum-1];
        answer += s[snum];
        
    }else{
        answer += s[snum-1];
    }
    
    return answer;
}

// 삼항조건(조건부) 연산자로 압축
function solution(s) {  
    var snum = Math.ceil(s.length/2);
    var answer = s.length % 2 == 0 ? s[snum-1] + s[snum]: s[snum-1];
    return answer;
}
