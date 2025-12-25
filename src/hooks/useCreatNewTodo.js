import { useState } from 'react';
import * as utils from '../utils/utils';
import { URL_DATA } from '../variables/variables';

export const useCreatNewTodo = ({ setTodos }) => {
    const [isCreating, setIsCreating] = useState(false);

    const onAddNewTodo = () => {
        setIsCreating(true);

        utils
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
