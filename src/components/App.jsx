import { useEffect, useState } from 'react';
import { TodoList } from './TodoList';
import { Button } from './Button';
import { SearchTodo } from './SearchTodo';
import { useCreatNewTodo } from '../hooks';
import { URL_DATA } from '../variables/variables';
import * as utils from '../utils/utils';
import styles from '../styles/App.module.css';

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [filtredTodos, setFiltredTodos] = useState(todos);
    const [isLoading, setIsLoading] = useState(false);
    const { isCreating, onAddNewTodo } = useCreatNewTodo({ setTodos });

    useEffect(() => {
        setIsLoading(true);

        const todosData = utils.getDataFetchRequest({
            url: URL_DATA,
        });

        todosData
            .then((data) => {
                setTodos(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setFiltredTodos(todos);
    }, [todos]);

    const onSortTodos = () => {
        const sortedTodos = [...todos];
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));

        setFiltredTodos(sortedTodos);
    };

    return (
        <div className={styles.container}>
            <div className={styles['button-list']}>
                <Button onClick={onSortTodos}>Сортировка по алфавиту</Button>
                <Button onClick={onAddNewTodo} isDisabled={isCreating}>
                    Добавить новую задачу
                </Button>
            </div>

            <div>
                <SearchTodo todos={todos} setFiltredTodos={setFiltredTodos} />
            </div>

            <TodoList
                todos={filtredTodos}
                setTodos={setTodos}
                isLoading={isLoading}
            />
        </div>
    );
};
