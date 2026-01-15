import { useState } from 'react';
import * as utils from '../utils/utils';
import { URL_DATA } from '../variables/variables';

export const useUpdateTodos = ({ setTodos }) => {
    const [stateUpdeting, setStateUpdeting] = useState('edit');

    const onUpdateTodos = ({ value, id }) => {
        setStateUpdeting('pending');

        utils
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
            .finally(() => setStateUpdeting('edit'));
    };

    return {
        stateUpdeting,
        setStateUpdeting,
        onUpdateTodos,
    };
};
