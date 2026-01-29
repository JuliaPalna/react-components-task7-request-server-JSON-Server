import { useState } from 'react';
import { fetchCreateTodo } from '../api/todoApi';
import { URL_DATA } from '../constants/constants';

export const useCreateNewTodo = ({ setTodos }) => {
    const [isCreating, setIsCreating] = useState(false);

    const onAddNewTodo = () => {
        setIsCreating(true);

        fetchCreateTodo({
            url: URL_DATA,
            data: { title: '...' },
        })
            .then((newTodo) => {
                setTodos((previous) => [...previous, newTodo]);
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
