import { useState } from 'react';
import * as utils from '../utils/utils';
import { URL_DATA } from '../variables/variables';

export const useRemoveTodo = ({ setTodos }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const onRemoveTodo = ({ target }) => {
        setIsRemoving(true);

        const currentTodoId = target.closest('li').id;

        utils
            .removeDataFetchRequest({
                url: `${URL_DATA}/${currentTodoId}`,
            })
            .then(() => {
                setTodos((previous) => {
                    return previous.filter((todo) => {
                        return String(todo.id) !== String(currentTodoId);
                    });
                });
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setIsRemoving(false));
    };

    return {
        isRemoving,
        onRemoveTodo,
    };
};
