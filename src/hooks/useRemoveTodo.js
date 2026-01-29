import { useState } from 'react';
import * as taskApi from '../api/taskApi';
import { URL_DATA } from '../constants/constants';

export const useRemoveTodo = ({ setTodos }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const onRemoveTodo = ({ id }) => {
        setIsRemoving(true);

        taskApi
            .removeDataFetchRequest({
                url: `${URL_DATA}/${id}`,
            })
            .then(() => {
                setTodos((previous) => {
                    return previous.filter((todo) => {
                        return String(todo.id) !== String(id);
                    });
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return {
        isRemoving,
        onRemoveTodo,
    };
};
