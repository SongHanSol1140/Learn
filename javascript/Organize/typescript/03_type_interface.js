//타입과 인터페이스
// 따라서 User2는 BaseUser에 age, gender?를 더한 값을 데이터값을 가짐
var user = {
    name: "John",
    age: 30,
    gender: "male"
};
var user2 = {
    name: "John",
    age: 30,
    gender: "male"
};
var hansol = {
    name: 'sol',
    age: 30
};
hansol.gender = "male";
console.log(hansol.gender);
// 이렇게 미리 gender?를 선언해두면 추후에 넣어도 문제가 없음
