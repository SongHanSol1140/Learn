// protoType.ts
interface Animal {
  sleep(): void;
}
class Animal {
  constructor(public name: string) {}

  walk(): void {
    console.log(`${this.name} can walk.`);
  }
}

class Rabbit extends Animal {
  jump(): void {
    console.log(`${this.name} can jump!`);
  }
}

// 'Bunny'라는 Rabbit 인스턴스를 생성합니다.
const bunny = new Rabbit("Bunny");

(Animal.prototype as any).sleep = function() {
  console.log(`${this.name} sleeping...`);
};

// 'bunny' 객체를 다시 생성하지 않았음에도 불구하고,
// 방금 추가된 sleep 메서드를 사용할 수 있습니다!
bunny.sleep(); // "Bunny is sleeping... Zzz"