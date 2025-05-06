//타입과 인터페이스

  /*
  type과 interface는 typescript에서 데이터 타입을 정의하는 두가지 방법
  두 가지다 비슷한 용도를 가졌지만
  type은 다른 type과 합치는데 중점을 두고
  interface는 처음 선언한 interface를 extends(확장)하는데 중점을 둠
  
  복잡한 로직을 구동할땐 type이 좋지만 주로 interface를 사용한다고함
  */

// interface 확장

interface BaseUser {
  name: string;
}

interface User1 extends BaseUser {
  age: number;
  gender?: string;
}

// 따라서 User1은 BaseUser에 age, gender?를 더한 값을 데이터값을 가짐
// (영알못을 위한 설명 : User1에 BaseUser를 추가하는게 아닌 BaseUser에 User1을 추가하는것)




const user: User1 = {
  name: "John",
  age: 30,
  gender: "male"
};

// type 조합
type BaseUser2 = {
  name: string;
};

type User2 = BaseUser2 & {
  age: number;
  gender?: string;
};

const user2: User2 = {
  name: "John",
  age: 30,
  gender: "male"
};


// 지금 보이는 결과는 같지만 interface는 확장성에 초점을두고 = +
// type은 type끼리 합치는것에 조금더 초점을 둔다고 함 = &



// key값 확장

// type User2 = {
//     name: string;
//     age: number;
//   }
  
//   var hansol: User2 = {
//     name: 'sol',
//     age: 30
//   }
//   hansol.gender = "male";
//   console.log(hansol.gender);

// 이렇게 할 시 User2의 타입선언에 gender가 없으므로 오류가나옴

type User3 = {
    name: string;
    age: number;
    gender? :string;
  }
  
  var hansol: User3 = {
    name: 'sol',
    age: 30
  }

hansol.gender = "male";
console.log(hansol.gender);
// 이렇게 미리 gender?를 선언해두면 추후에 넣어도 문제가 없음