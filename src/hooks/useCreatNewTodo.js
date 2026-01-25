import { use, useState } from 'react';
import { AppContext } from '../context';
import { URL_DATA } from '../constants/constants';
import * as utils from '../api/taskApi';

export const useCreatNewTodo = () => {
    const { dispatch } = use(AppContext);
    const [isCreating, setIsCreating] = useState(false);

    const onAddNewTodo = () => {
        setIsCreating(true);

        utils
            .createDataFetch({
                url: URL_DATA,
                data: { title: '' },
            })
            .then((newTodo) => {
                dispatch({
                    type: 'SET_TODOS_DATA',
                    payload: (previous) => [...previous, newTodo],
                });
            })

            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setIsCreating(false));
    };

    return {
        isCreating,
        onAddNewTodo,
    };
};
