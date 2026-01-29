import { useState } from 'react';
import * as taskApi from '../api/taskApi';
import { URL_DATA } from '../constants/constants';

export const useUpdateTodos = ({ setTodos }) => {
    const [stateUpdating, setStateUpdating] = useState('edit');

    const onUpdateTodos = ({ value, id }) => {
        setStateUpdating('pending');

        taskApi
            .updateDataFetchRequest({
                url: `${URL_DATA}/${id}`,
                data: {
                    title: value,
                },
            })
            .then((updateTodo) => {
                setTodos((previous) => {
                    return previous.map((todo) => {
                        return String(todo.id) === String(id)
                            ? updateTodo
                            : todo;
                    });
                });
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setStateUpdating('edit'));
    };

    return {
        stateUpdating,
        setStateUpdating,
        onUpdateTodos,
    };
};
