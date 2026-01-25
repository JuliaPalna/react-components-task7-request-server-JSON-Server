import { useState, use } from 'react';
import { AppContext } from '../context';
import { URL_DATA } from '../constants/constants';
import * as utils from '../api/taskApi';

export const useRemoveTodo = () => {
    const { dispatch } = use(AppContext);
    const [isRemoving, setIsRemoving] = useState(false);

    const onRemoveTodo = (id) => {
        setIsRemoving(true);

        utils
            .removeDataFetch({
                url: `${URL_DATA}/${id}`,
            })
            .then(() => {
                dispatch({
                    type: 'SET_TODOS_DATA',
                    payload: (previous) => {
                        return previous.filter((todo) => {
                            return String(todo.id) !== String(id);
                        });
                    },
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
