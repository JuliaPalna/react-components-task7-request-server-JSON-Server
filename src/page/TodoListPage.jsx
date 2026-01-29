import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, SearchTodo } from '../components';
import { useCreateNewTodo } from '../hooks';
import { URL_DATA } from '../constants/constants';
import { fetchTodos } from '../api/todoApi';
import styles from '../styles/todoList.module.css';

export const TodoListPage = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const { isCreating, onAddNewTodo } = useCreateNewTodo({ setTodos });

    useEffect(() => {
        setIsLoading(true);

        const todosData = fetchTodos({
            url: URL_DATA,
        });

        todosData
            .then((data) => {
                setTodos(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setFilteredTodos(todos);
    }, [todos]);

    const onSortTodos = () => {
        const sortedTodos = [...todos];
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));

        setFilteredTodos(sortedTodos);
    };

    return (
        <>
            <div className={styles['button-list']}>
                <Button onClick={onSortTodos}>Сортировка по алфавиту</Button>
                <Button onClick={onAddNewTodo} isDisabled={isCreating}>
                    Добавить новую задачу
                </Button>
            </div>

            <div>
                <SearchTodo todos={todos} setFilteredTodos={setFilteredTodos} />
            </div>

            <h1 className={styles.title}>Список дел</h1>

            <ul className={styles.list}>
                {isLoading ? (
                    <p className={styles.center}>Загрузка...</p>
                ) : filteredTodos.length === 0 ? (
                    <p className={styles.center}>Задач нет</p>
                ) : (
                    filteredTodos.map(({ id, title }) => {
                        return (
                            <li
                                key={id}
                                id={id}
                                className={styles['list_item']}
                            >
                                <Link
                                    className={styles.link}
                                    to={`/task/${id}`}
                                >
                                    <p>{title}</p>
                                </Link>
                            </li>
                        );
                    })
                )}
            </ul>
        </>
    );
};
