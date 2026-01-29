import { useState } from 'react';

export const useSearchTodo = ({ todos, setFilteredTodos }) => {
    const [searchValue, setSearchValue] = useState('');

    const onChange = ({ target }) => {
        setSearchValue(target.value);
    };

    const onSearch = () => {
        const filteredTodos = todos.filter(({ title }) => {
            return title.includes(searchValue);
        });

        setFilteredTodos(filteredTodos);
    };

    const onReset = () => {
        setSearchValue('');
        setFilteredTodos(todos);
    };

    return {
        searchValue,
        onReset,
        onSearch,
        onChange,
    };
};
