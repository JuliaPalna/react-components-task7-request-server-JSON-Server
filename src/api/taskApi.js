export async function getDataFetch({ url }) {
    return fetch(`${url}`).then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }

        return response.json();
    });
}

export async function createDataFetch({ url, data }) {
    return fetch(`${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }

        return response.json();
    });
}

export async function updateDataFetch({ url, data }) {
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }

        return response.json();
    });
}

export async function removeDataFetch({ url }) {
    return fetch(url, {
        method: 'DELETE',
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }

        return response.json();
    });
}
