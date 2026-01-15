export async function getDataFetchRequest({ url }) {
    return await fetch(`${url}`).then((response) => {
        if (!response.ok) {
            return null;
        }

        return response.json();
    });
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

export function getTrimString({ string, length }) {
    if (string.length > length) {
        return string.slice(0, length) + `...`;
    }

    return string;
}
