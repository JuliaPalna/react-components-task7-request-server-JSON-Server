import { useState } from 'react';
import { Button } from './Button';
import { useRemoveTodo, useUpdateTodos } from '../hooks/';
import styles from '../styles/todo.module.css';

export const Todo = ({ title, id }) => {
    const [valueTodo, setValueTodo] = useState(title);
    const { isRemoving, onRemoveTodo } = useRemoveTodo();
    const { stateUpdating, onUpdateTodos } = useUpdateTodos();

    const onChangeValue = ({ target }) => {
        setValueTodo(target.value);
    };

    const onClickUpdating = () => {
        if (stateUpdating === 'edit') {
            onUpdateTodos({ id, valueTodo });
        }
    };

    const getNameButton = () => {
        switch (stateUpdating) {
            case 'pending':
                return 'Отправка...';
            case 'edit':
            default:
                return 'Редактировать';
        }
    };

    return (
        <>
            <textarea
                type="text"
                name="newTodo"
                placeholder="Введите новое дело..."
                value={valueTodo}
                onChange={onChangeValue}
                className={styles.input}
            />

            <div className={styles['button-list']}>
                <Button
                    size="small"
                    onClick={onClickUpdating}
                    isDisabled={stateUpdating === 'pending'}
                >
                    {getNameButton()}
                </Button>

                <Button
                    size="small"
                    onClick={() => onRemoveTodo(id)}
                    isDisabled={isRemoving}
                >
                    Удалить
                </Button>
            </div>
        </>
    );
};
