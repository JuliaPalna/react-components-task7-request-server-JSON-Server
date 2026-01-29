import { use } from 'react';
import { AppContext } from '../context';
import { useCreateNewTodo } from '../hooks';
import { Button } from './Button';
import { SearchTodo } from './SearchTodo';
import styles from '../styles/controlPanel.module.css';

export const ControlPanel = ({ setFilteredTodos }) => {
    const { todos } = use(AppContext);
    const { isCreating, onAddNewTodo } = useCreateNewTodo();

    const onSortTodos = () => {
        setFilteredTodos((prev) => {
            return [...prev].sort((a, b) => a.title.localeCompare(b.title));
        });
    };

    const onReset = () => {
        setFilteredTodos(todos);
    };

    const onSearch = (searchValue) => {
        setFilteredTodos((prev) => {
            return prev.filter(({ title }) => {
                return title.includes(searchValue);
            });
        });
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
                <SearchTodo onReset={onReset} onSearch={onSearch} />
            </div>
        </>
    );
};
