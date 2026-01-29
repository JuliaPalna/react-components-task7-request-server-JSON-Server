import { useState } from 'react';
import * as taskApi from '../api/taskApi';
import { URL_DATA } from '../constants/constants';

export const useCreateNewTodo = ({ setTodos }) => {
    const [isCreating, setIsCreating] = useState(false);

    const onAddNewTodo = () => {
        setIsCreating(true);

        taskApi
            .createDataFetchRequest({
                url: URL_DATA,
                data: { title: 'Новая задача' },
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
