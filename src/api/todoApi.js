export async function fetchTodos({ url }) {
    const response = await fetch(`${url}`);
    if (!response.ok) {
        return null;
    }
    return response.json();
}

export async function fetchCreateTodo({ url, data }) {
    const response = await fetch(`${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function fetchUpdateTodo({ url, data }) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function fetchRemoveTodo({ url }) {
    const response = await fetch(url, {
        method: 'DELETE',
    });
    return await response.json();
}
