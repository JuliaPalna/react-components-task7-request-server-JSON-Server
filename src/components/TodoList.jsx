import { Todo } from './Todo';
import styles from '../styles/todoList.module.css';

export const TodoList = ({ isLoading, array }) => {
    return (
        <>
            <h1 className={styles.title}>Список дел</h1>

            <ul className={styles.list}>
                {isLoading ? (
                    <p className={styles.center}>Загрузка...</p>
                ) : array.length === 0 ? (
                    <p className={styles.center}>Задач нет</p>
                ) : (
                    array.map(({ id, title }) => {
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
