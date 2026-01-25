export const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_TODO_DATA': {
            return (previous) => [...previous, payload];
        }
        case 'REMOVE_TODO_DATA': {
            return (previous) => {
                return previous.filter((todo) => {
                    return String(todo.id) !== String(payload);
                });
            };
        }
        case 'UPDATE_TODO_DATA': {
            return (previous) => {
                return previous.map((todo) => {
                    return String(todo.id) === String(payload.id)
                        ? payload.updateTodo
                        : todo;
                });
            };
        }
        default:
            return state;
    }
};
