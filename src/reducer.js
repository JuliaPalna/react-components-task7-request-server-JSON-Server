export const reducer = (initialState, action) => {
    const { type, payload } = action;
    let state = initialState;

    switch (type) {
        case 'SET_TODO_DATA': {
            state = (previous) => [...previous, payload];
            break;
        }
        case 'REMOVE_TODO_DATA': {
            state = (previous) => {
                return previous.filter((todo) => {
                    return String(todo.id) !== String(payload);
                });
            };
            break;
        }
        case 'UPDATE_TODO_DATA': {
            state = (previous) => {
                return previous.map((todo) => {
                    return String(todo.id) === String(payload.id)
                        ? payload.updateTodo
                        : todo;
                });
            };
            break;
        }
        default:
            break;
    }

    return state;
};
