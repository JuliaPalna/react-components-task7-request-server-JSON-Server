export async function getDataFetchRequest({ url }) {
    return await fetch(`${url}`).then((response) => response.json());
}

export async function createDataFetchRequest({ url, data }) {
    return await fetch(`${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export async function updateDataFetchRequest({ url, data }) {
    return await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export async function removeDataFetchRequest({ url }) {
    return await fetch(url, {
        method: 'DELETE',
    }).then((response) => response.json());
}
