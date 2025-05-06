// 1. Map 생성: key는 number, value는 string 타입으로 지정합니다.
let userMap: Map<number, string> = new Map();

// 2. Create (추가)
// .set(key, value)를 사용해 데이터를 추가합니다.
userMap.set(1, 'Alice');
userMap.set(2, 'Bob');
userMap.set(3, 'Charlie');
console.log('Create 후:', userMap);

// 3. Read (읽기)
// .get(key)를 사용하여 특정 key의 값을 가져옵니다.
let user1 = userMap.get(1);
console.log('키 1의 값:', user1);

// 존재하지 않는 key의 경우 undefined가 반환됩니다.
let user4 = userMap.get(4);
console.log('키 4의 값:', user4);

// 4. Update (수정)
// key가 존재하는지 확인한 후에 .set(key, newValue)로 값을 변경할 수 있습니다.  
if (userMap.has(2)) {
    userMap.set(2, 'Bobby');
}
console.log('Update 후:', userMap);

// 5. Delete (삭제)
// .delete(key)를 사용해 특정 key-value 쌍을 삭제합니다.
userMap.delete(3);
console.log('Delete 후:', userMap);

// 추가로, .clear()를 사용하면 모든 데이터를 한 번에 삭제할 수 있습니다.
userMap.clear();
console.log('Clear 후:', userMap);
