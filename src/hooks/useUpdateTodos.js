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
                    type: 'SET_TODOS_DATA',
                    payload: (previous) => {
                        return previous.map((todo) => {
                            return String(todo.id) === String(id)
                                ? updateTodo
                                : todo;
                        });
                    },
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
