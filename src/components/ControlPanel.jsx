import { useCreatNewTodo, useSortTodos } from '../hooks';
import { Button } from './Button';
import { SearchTodo } from './SearchTodo';
import styles from '../styles/controlPanel.module.css';

export const ControlPanel = () => {
    const { isCreating, onAddNewTodo } = useCreatNewTodo();
    const { onSortTodos } = useSortTodos();

    return (
        <>
            <div className={styles['button-list']}>
                <Button onClick={onSortTodos}>Сортировка по алфавиту</Button>
                <Button onClick={onAddNewTodo} isDisabled={isCreating}>
                    Добавить новую задачу
                </Button>
            </div>

            <div>
                <SearchTodo />
            </div>
        </>
    );
};
