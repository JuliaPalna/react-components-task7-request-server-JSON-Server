import { use } from 'react';
import { AppContext } from '../context';
import { useCreatNewTodo } from '../hooks';
import { Button } from './Button';
import { SearchTodo } from './SearchTodo';
import styles from '../styles/controlPanel.module.css';

export const ControlPanel = ({ setFiltredTodos }) => {
    const { todos } = use(AppContext);
    const { isCreating, onAddNewTodo } = useCreatNewTodo();

    const onSortTodos = () => {
        setFiltredTodos((prev) => {
            return [...prev].sort((a, b) => a.title.localeCompare(b.title));
        });
    };

    const onReset = () => {
        setFiltredTodos(todos);
    };

    const onSearch = (searchValue) => {
        setFiltredTodos((prev) => {
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
