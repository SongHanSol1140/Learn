// 기본 프로미스 예제
const myPromise = new Promise((resolve, reject) => {
    const success = true; // 작업의 성공 여부를 가정

    if (success) {
        resolve('작업이 성공했습니다!');
    } else {
        reject('작업이 실패했습니다.');
    }
});

myPromise
    .then((message) => {
        console.log(message); // 성공 시: '작업이 성공했습니다!' 출력
    })
    .catch((error) => {
        console.error(error); // 실패 시: '작업이 실패했습니다.' 출력
    });



// 비동기작업
function asyncTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true;

            if (success) {
                resolve('5초 후 작업이 성공했습니다!');
            } else {
                reject('5초 후 작업이 실패했습니다.');
            }
        }, 5000);
    });
}

asyncTask()
    .then((message) => {
        console.log(message); // 2초 후 '2초 후 작업이 성공했습니다!' 출력
    })
    .catch((error) => {
        console.error(error); // 작업이 실패한 경우 에러 메시지 출력
    });




// 프로미스 체이닝
// 프로미스를 사용하면 여러 비동기 작업을 순차적으로 처리할 수 있습니다. 예를 들어:
// 체이닝: task1()이 끝난 후 task2()가 실행되며, 모든 작업이 완료되면 "모든 작업 완료"가 출력됩니다.
// 이런 식으로 프로미스를 체인처럼 연결하여 여러 비동기 작업을 순서대로 처리할 수 있습니다.
function task1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Task 1 완료');
            resolve();
        }, 1000);
    });
}

function task2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Task 2 완료');
            resolve();
        }, 1000);
    });
}

task1()
    .then(() => task2())
    .then(() => {
        console.log('모든 작업 완료');
    });


// async와 await
// 프로미스를 조금 더 편리하게 사용하는 방식으로 **async와 await**가 있습니다. 이들은 프로미스 기반의 비동기 작업을 마치 동기 작업처럼 작성할 수 있게 해줍니다.
async function executeTasks() {
    try {
        await task1();
        await task2();
        console.log('모든 작업 완료 (async/await)');
    } catch (error) {
        console.error('에러 발생:', error);
    }
}

executeTasks();
