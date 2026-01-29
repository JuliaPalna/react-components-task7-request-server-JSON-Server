export async function getDataFetchRequest({ url }) {
    const response = await fetch(`${url}`);
    if (!response.ok) {
        return null;
    }
    return response.json();
}

export async function createDataFetchRequest({ url, data }) {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function updateDataFetchRequest({ url, data }) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function removeDataFetchRequest({ url }) {
    const response = await fetch(url, {
        method: 'DELETE',
    });
    return await response.json();
}
