import { use } from 'react';
import { AppContext } from '../context';

export const useSortTodos = () => {
    const { todos, dispatch } = use(AppContext);

    const onSortTodos = () => {
        const sortedTodos = [...todos];
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));

        dispatch({ type: 'SORTED_TODOS_DATA', payload: sortedTodos });
    };

    return { onSortTodos };
};
