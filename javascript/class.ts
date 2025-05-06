// note.ts
import * as fs from 'fs';

// 목표
// 인터페이스를 사용하여 특정 기능에 대한 계약(Contract)을 정의합니다.
// 클래스를 사용하여 해당 인터페이스를 구현합니다.
// **의존성 주입(Dependency Injection)**을 통해 클래스 인스턴스를 주입하여 결합도를 낮춥니다.
// 예제 시나리오
// 로그를 출력하는 기능이 필요한 애플리케이션이 있습니다.
// 로그를 콘솔에 출력하거나 파일에 저장하는 두 가지 방법이 있습니다.
// 로그 출력 방식을 유연하게 변경할 수 있도록 합니다.


// Logger 인터페이스 정의
// Logger 인터페이스는 log 메서드를 가진 계약을 정의합니다.
export interface Logger {
    log(message: string): void;
  }



// ConsoleLogger 클래스 구현
// ConsoleLogger 클래스는 Logger 인터페이스를 구현하며, 메시지를 콘솔에 출력합니다.
export class ConsoleLogger implements Logger {
    log(message: string): void {
      console.log(`ConsoleLogger: ${message}`);
    }
}


// FileLogger 클래스 구현
// FileLogger 클래스는 Logger 인터페이스를 구현하며, 메시지를 파일에 저장합니다.

export class FileLogger implements Logger {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  log(message: string): void {
    fs.appendFileSync(this.filePath, `FileLogger: ${message}\n`);
  }
}
// UserService 클래스 구현
// UserService 클래스는 Logger 인터페이스 타입의 logger를 의존성으로 받습니다.
// 이를 통해 어떤 종류의 로거든 주입하여 사용할 수 있습니다.
export class UserService {
    private logger: Logger;
  
    constructor(logger: Logger) {
      this.logger = logger;
    }
  
    createUser(name: string): void {
      // 사용자 생성 로직 (예시용)
      this.logger.log(`User ${name} has been created.`);
    }
  }



// 의존성 주입과 실행
// 콘솔 로거를 사용하는 경우
const consoleLogger = new ConsoleLogger();
const userServiceWithConsoleLogger = new UserService(consoleLogger);
userServiceWithConsoleLogger.createUser('Alice');

// 파일 로거를 사용하는 경우
const fileLogger = new FileLogger('log.txt');
const userServiceWithFileLogger = new UserService(fileLogger);
userServiceWithFileLogger.createUser('Bob');