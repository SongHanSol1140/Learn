// 문제 설명
// 얀에서는 매년 달리기 경주가 열립니다.
// 해설진들은 선수들이 자기 바로 앞의 선수를 추월할 때 추월한 선수의 이름을 부릅니다.
// 예를 들어 1등부터 3등까지 "mumu", "soe", "poe" 선수들이 순서대로 달리고 있을 때,
// 해설진이 "soe"선수를 불렀다면 2등인 "soe" 선수가 1등인 "mumu" 선수를 추월했다는 것입니다. 즉 "soe" 선수가 1등, "mumu" 선수가 2등으로 바뀝니다.

// 선수들의 이름이 1등부터 현재 등수 순서대로 담긴 문자열 배열 players와 해설진이 부른 이름을 담은 문자열 배열 callings가 매개변수로 주어질 때,
// 경주가 끝났을 때 선수들의 이름을 1등부터 등수 순서대로 배열에 담아 return 하는 solution 함수를 완성해주세요.

// 제한사항
// 5 ≤ players의 길이 ≤ 50,000
// players[i]는 i번째 선수의 이름을 의미합니다.
// players의 원소들은 알파벳 소문자로만 이루어져 있습니다.
// players에는 중복된 값이 들어가 있지 않습니다.
// 3 ≤ players[i]의 길이 ≤ 10
// 2 ≤ callings의 길이 ≤ 1,000,000
// callings는 players의 원소들로만 이루어져 있습니다.
// 경주 진행중 1등인 선수의 이름은 불리지 않습니다.

// 입출력 예
// players
// ["mumu", "soe", "poe", "kai", "mine"]
// callings
// ["kai", "kai", "mine", "mine"]
// result
// ["mumu", "kai", "mine", "soe", "poe"]

// 입출력 예 설명
// 4등인 "kai" 선수가 2번 추월하여 2등이 되고 앞서 3등, 2등인 "poe", "soe" 선수는 4등, 3등이 됩니다.
// 5등인 "mine" 선수가 2번 추월하여 4등, 3등인 "poe", "soe" 선수가 5등, 4등이 되고 경주가 끝납니다.
// 1등부터 배열에 담으면 ["mumu", "kai", "mine", "soe", "poe"]이 됩니다.

// 주어진 함수
function solution(players, callings) {
    var answer = [];
    return answer;
}

// 풀이1 - 시간 초과로 인한 오류
function solution(players, callings) {
    for(var i = 0; i < callings.length; i++){
        var checkNumber = players.indexOf(callings[i]);
        if(checkNumber > -1){
            players.splice(checkNumber, 1);
            players.splice(checkNumber-1, 0, callings[i]);  
        }
    }
    return players;
}
// 풀이2 - 시간 초과
function solution(players, callings) {
    for(var i = 0; i < callings.length; i++){
        if(players.includes(callings[i])){
            var checkNumber = players.indexOf(callings[i]);
            players.splice(checkNumber, 1);
            players.splice(checkNumber-1, 0, callings[i]);  
        }
    }
    return players;
}

//풀이 3 Map 객체를 이용한 풀이방식
function solution(players, callings) {
    let playerMap = new Map();
    for (var i = 0; i < players.length; i++) {
      playerMap.set(players[i], i); // players[i] = i 형식으로 playerMap객체 set
    }
    for (var i = 0; i < callings.length; i++) {
      if (playerMap.has(callings[i])) { // has는 ()안의 내용이 받은 변수에 존재유무를 확인하는 메서드(Map에서)
        let index = playerMap.get(callings[i]); //get은 ()안에 내용물에 맞는 값을 반환하는 메서드(Map에서)
        if (index > 0) {
          playerMap.set(players[index - 1], index);
          playerMap.set(callings[i], index - 1);
          [players[index], players[index - 1]] = [players[index - 1], players[index]];
        }
      }
    }
  
    return players;
}