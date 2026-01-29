import { useState } from 'react';
import { fetchUpdateTodo } from '../api/todoApi';
import { URL_DATA } from '../constants/constants';

export const useUpdateTodos = () => {
    const [stateUpdating, setStateUpdating] = useState('edit');

    const onUpdateTodos = ({ value, id }) => {
        setStateUpdating('pending');

        fetchUpdateTodo({
            url: `${URL_DATA}/${id}`,
            data: {
                title: value,
            },
        })
            .then(() => {})
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setStateUpdating('edit'));
    };

    return {
        stateUpdating,
        onUpdateTodos,
    };
};
