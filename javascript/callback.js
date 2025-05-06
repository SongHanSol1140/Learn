const readline = require('readline');

function processUserInput(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('이름을 입력해주세요: ', (userName) => {
    callback(userName);
    rl.close();
  });
}

function greetUser(name) {
  console.log(`안녕하세요, ${name}님!`);
}

// 콜백 함수 사용
processUserInput(greetUser);




/*
코드 실행 순서 상세 설명
    1. const readline = require('readline');
        Node.js의 내장 모듈인 readline을 가져옵니다.
        이 모듈은 콘솔에서 사용자 입력을 받을 때 사용합니다.

    2. function processUserInput(callback) { ... }
        callback이라는 매개변수를 받는 함수 processUserInput을 정의합니다.
        이 함수는 사용자 입력을 받은 후, 그 결과를 callback 함수에 전달합니다.

    3. function greetUser(name) { ... }
        name을 매개변수로 받아 환영 메시지를 출력하는 함수 greetUser를 정의합니다.

    4. processUserInput(greetUser);
        processUserInput 함수를 호출하면서 greetUser 함수를 인자로 전달합니다.
        이로써 processUserInput 함수의 callback 매개변수는 greetUser 함수가 됩니다.

    5. processUserInput 함수 내부 실행 시작
        const rl = readline.createInterface({...});
            사용자 입력과 출력을 처리하기 위한 인터페이스 rl을 생성합니다.
            input은 표준 입력(process.stdin), output은 표준 출력(process.stdout)으로 설정합니다.

        rl.question('이름을 입력해주세요: ', (userName) => { ... });
            콘솔에 '이름을 입력해주세요: '라는 메시지를 출력하고, 사용자의 입력을 기다립니다.
            사용자가 입력을 완료하면, 콜백 함수 (userName) => { ... }가 실행됩니다.
            이 콜백 함수는 입력된 값을 userName 매개변수로 받습니다.

    6. 사용자가 이름을 입력하고 엔터를 누름
        예를 들어, 사용자가 홍길동을 입력했다면, userName은 '홍길동'이 됩니다.

    7. rl.question의 콜백 함수 실행
        callback(userName);
            이전에 processUserInput(greetUser);로 호출했으므로, callback은 greetUser 함수입니다.
            따라서 greetUser(userName);을 호출하게 됩니다.
        rl.close();
            입력 스트림을 닫아줍니다. 이것은 프로그램이 계속해서 입력을 기다리지 않도록 합니다.

    8. greetUser 함수 실행
        console.log(\안녕하세요, ${name}님!`);`
            name은 userName과 동일하므로, 콘솔에 안녕하세요, 홍길동님!이 출력됩니다.

콜백 함수의 동작 이해하기
    콜백 함수란?
        다른 함수에 매개변수로 전달되어 특정 작업이 완료된 후 호출되는 함수입니다.
        비동기 작업(예: 사용자 입력, 파일 읽기, 네트워크 요청 등)이 완료된 후 실행할 작업을 정의할 때 사용합니다.

    왜 콜백 함수를 사용하는가?
        자바스크립트는 비동기 처리가 빈번하므로, 작업이 완료된 후 실행할 코드를 콜백 함수로 전달하여 비동기 흐름을 관리합니다.



    코드 흐름을 한눈에 보기
        프로그램 시작
        processUserInput 함수가 greetUser 함수를 콜백으로 받아 호출됩니다.
        processUserInput 함수 내에서 rl.question이 실행되어 사용자에게 메시지를 표시하고 입력을 기다립니다.
        사용자가 이름을 입력하고 엔터를 누릅니다.
        입력이 완료되면 rl.question의 콜백 함수가 실행되어:
        callback(userName);을 호출합니다. 여기서 callback은 greetUser 함수입니다.
        따라서 greetUser(userName);이 호출됩니다.
        greetUser 함수는 전달받은 userName을 사용하여 환영 메시지를 출력합니다.
        rl.close();를 호출하여 입력 인터페이스를 닫습니다.
        프로그램 종료


*/