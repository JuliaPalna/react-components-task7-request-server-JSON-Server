import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { SearchTodo } from './SearchTodo';
import { useCreatNewTodo } from '../hooks';
import { getTrimString } from '../utils/utils';
import styles from '../styles/todoList.module.css';

export const TodoList = ({ todos, setTodos, isLoading }) => {
    const [filtredTodos, setFiltredTodos] = useState(todos);
    const { isCreating, onAddNewTodo } = useCreatNewTodo({ setTodos });

    useEffect(() => {
        setFiltredTodos(todos);
    }, [todos]);

    const onSortTodos = () => {
        const sortedTodos = [...todos];
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));

        setFiltredTodos(sortedTodos);
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
                <SearchTodo todos={todos} setFiltredTodos={setFiltredTodos} />
            </div>

            <h1 className={styles.title}>Список дел</h1>

            <ul className={styles.list}>
                {isLoading ? (
                    <p className={styles.center}>Загрузка...</p>
                ) : filtredTodos.length === 0 ? (
                    <p className={styles.center}>Задач нет</p>
                ) : (
                    filtredTodos.map(({ id, title }) => {
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
                                    <p>
                                        {getTrimString({
                                            string: title,
                                            length: 20,
                                        })}
                                    </p>
                                </Link>
                            </li>
                        );
                    })
                )}
            </ul>
        </>
    );
};
