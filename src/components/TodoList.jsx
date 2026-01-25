import { Todo } from './Todo';
import styles from '../styles/todoList.module.css';

export const TodoList = ({ isLoading, filtredTodos }) => {
    return (
        <>
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
                                <Todo id={id} title={title} />
                            </li>
                        );
                    })
                )}
            </ul>
        </>
    );
};
