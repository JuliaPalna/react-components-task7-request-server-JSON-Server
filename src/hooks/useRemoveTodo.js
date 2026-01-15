import { useState } from 'react';
import * as utils from '../utils/utils';
import { URL_DATA } from '../variables/variables';

export const useRemoveTodo = ({ setTodos }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const onRemoveTodo = ({ id }) => {
        setIsRemoving(true);

        utils
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
