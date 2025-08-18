async function getFetch() {
    const response = await fetch('https://api.example.com/data');
    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
    }
    return data;
}

const data = getFetch();
console.log(data);

async function PostFetch() {
    const response = await fetch('https://api.example.com/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'John',
            age: 30
        })
    });
    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
    }
    return data;
}

async function PutFetch() {
    const response = await fetch('https://api.example.com/data', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function DeleteFetch() {
    const response = await fetch('https://api.example.com/data', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

