// 1. 기본적인 데이터타입 설정
var basic_string = 'hansol';
basic_string = 'songhansol';
// basic_string = 1; ---------- 데이터타입이 string이 아니므로 오류
var basic_number = 1;
// 2. 배열 데이터 타입
var array = ['song', 'han', 'sol'];
var array1 = ['song', 'han', 'sol'];
//  array 에는 string타입의 데이터만 들어와야 함
// 3. 오브젝트 데이터 타입
var obejct = { name: 'songhansol', age: 30 };
var obejct2 = { age: 30 };
// name 속성이 들어올수도, 안들어올 수도있음
// name의 데이터 타입이 string이 아닐수도 있다는 의미가 아니다
// 4. 여러가지 데이터 타입을 한번에 넣기
var union = 'string';
var union2 = 123;
// string 혹은 number타입이 들어간다.
var array2 = ['song', 'han', 1];
var array3 = ['song', 'han', 1]; // 모든 데이터형을 넣어도 오류가 없으므로 문제가 생길 확률이 높음
var object3 = { name: '1', age: 'hansal' };
// 5. 함수에 데이터타입 설정
function hamsu(x) {
    return x * 2;
}
// x는 무조건 number로 들어와야 함
// 6. 리턴 값에도 데이터타입을 설정할 수 있음   
function hamsu2(x) {
    return x * 2;
}
var john = ['한솔', true];
var john2 = { name: '1234' };
//문자|숫자로 된 모든 값은 string이어야 함
var john3 = { name: '123', 123: '123' };
// 9. class 설정
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
