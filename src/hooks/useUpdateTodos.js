import { useState } from 'react';
import * as utils from '../utils/utils';
import { URL_DATA } from '../variables/variables';

export const useUpdateTodos = ({ setTodos }) => {
    const [stateUpdeting, setStateUpdeting] = useState('edit');

    const onUpdateTodos = ({ target, valueTodo }) => {
        setStateUpdeting('pending');

        const currentTodo = target.closest('li');
        const currentTodoId = currentTodo.id;

        utils
            .updateDataFetchRequest({
                url: `${URL_DATA}/${currentTodoId}`,
                data: {
                    title: valueTodo,
                },
            })
            .then((updateTodo) => {
                setTodos((previous) => {
                    return previous.map((todo) => {
                        return String(todo.id) === String(currentTodoId)
                            ? updateTodo
                            : todo;
                    });
                });
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setStateUpdeting('edit'));
    };

    return {
        stateUpdeting,
        setStateUpdeting,
        onUpdateTodos,
    };
};
