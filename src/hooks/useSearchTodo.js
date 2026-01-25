import { useState, use } from 'react';
import { AppContext } from '../context';

export const useSearchTodo = () => {
    const { todos, dispatch } = use(AppContext);
    const [searchValue, setSearchValue] = useState('');

    const onChange = ({ target }) => {
        setSearchValue(target.value);
    };

    const onSearch = () => {
        const filtredTodos = todos.filter(({ title }) => {
            return title.includes(searchValue);
        });

        dispatch({ type: 'FILTRED_TODOS_DATA', payload: filtredTodos });
    };

    const onReset = () => {
        setSearchValue('');
        dispatch({ type: 'FILTRED_TODOS_DATA', payload: todos });
    };

    return {
        searchValue,
        onReset,
        onSearch,
        onChange,
    };
};
