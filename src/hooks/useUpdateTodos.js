import { use, useState } from 'react';
import { AppContext } from '../context';
import { URL_DATA } from '../constants/constants';
import * as utils from '../api/taskApi';

export const useUpdateTodos = () => {
    const { dispatch } = use(AppContext);
    const [stateUpdeting, setStateUpdeting] = useState('edit');

    const onUpdateTodos = ({ id, valueTodo }) => {
        setStateUpdeting('pending');

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
            .finally(() => setStateUpdeting('edit'));
    };

    return {
        stateUpdeting,
        setStateUpdeting,
        onUpdateTodos,
    };
};
