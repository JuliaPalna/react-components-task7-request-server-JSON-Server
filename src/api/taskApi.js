export async function getDataFetch({ url }) {
    const response = await fetch(`${url}`);
    if (!response.ok) {
        throw new Error('Ошибка запроса');
    }
    return await response.json();
}

export async function createDataFetch({ url, data }) {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Ошибка запроса');
    }
    return await response.json();
}

export async function updateDataFetch({ url, data }) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Ошибка запроса');
    }
    return await response.json();
}

export async function removeDataFetch({ url }) {
    const response = await fetch(url, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Ошибка запроса');
    }
    return await response.json();
}
