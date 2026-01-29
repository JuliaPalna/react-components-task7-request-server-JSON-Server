import { use, useState } from 'react';
import { AppContext } from '../context';
import { URL_DATA } from '../constants/constants';
import * as utils from '../api/taskApi';

export const useUpdateTodos = () => {
    const { dispatch } = use(AppContext);
    const [stateUpdating, setStateUpdating] = useState('edit');

    const onUpdateTodos = ({ id, valueTodo }) => {
        setStateUpdating('pending');

        utils
            .updateDataFetch({
                url: `${URL_DATA}/${id}`,
                data: {
                    title: valueTodo,
                },
            })
            .then((updateTodo) => {
                dispatch({
                    type: 'UPDATE_TODO_DATA',
                    payload: { updateTodo, id },
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
