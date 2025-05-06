
let pattern = new RegExp(/\d{4}\/\d{2}\/\d{2}/, 'g');
let dateS = '2020/02/02'

console.log(dateS) // 2020/02/02
console.log(pattern.test(dateS)); // true
console.log(pattern.test(dateS)); // true

if (pattern.test(dateS)) {
    console.log("if문들어왔어요");
} else {
    console.log("안들어왔어요");
}
