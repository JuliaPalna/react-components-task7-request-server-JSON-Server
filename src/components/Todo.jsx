import { useEffect, useState } from 'react';
import { Button } from './Button';
import { useRemoveTodo, useUpdateTodos } from '../hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LOADING_TIMEOUT, URL_DATA } from '../constants/constants';
import * as taskApi from '../api/taskApi';
import styles from '../styles/todo.module.css';

export const Todo = ({ setTodos }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { isRemoving, onRemoveTodo } = useRemoveTodo({ setTodos });
    const { stateUpdating, setStateUpdating, onUpdateTodos } = useUpdateTodos({
        setTodos,
    });

    useEffect(() => {
        let isLoadingTimeout = false;
        let isProductLoaded = false;

        setIsLoading(true);

        setTimeout(() => {
            isLoadingTimeout = true;

            if (!isProductLoaded) {
                console.log('истекло время');
                navigate('/todo-loader-error', { replace: true });
            }
        }, LOADING_TIMEOUT);

        const todoData = taskApi.getDataFetchRequest({
            url: `${URL_DATA}/${params.id}`,
        });

        todoData
            .then((data) => {
                isProductLoaded = true;

                if (!isLoadingTimeout) {
                    if (!data) {
                        navigate('/404', { replace: true });
                        return;
                    }

                    setTodo(data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }, [navigate, params.id]);

    const onChangeValue = ({ target }) => {
        setTodo({ ...todo, title: target.value });
    };

    const onClickUpdating = () => {
        if (stateUpdating === 'save') {
            onUpdateTodos({ value: todo.title, id: params.id });
        } else if (stateUpdating === 'edit') {
            setStateUpdating('save');
        }
    };

    const getNameButton = () => {
        switch (stateUpdating) {
            case 'pending':
                return 'Отправка...';
            case 'save':
                return 'Сохранить';
            case 'edit':
            default:
                return 'Редактировать';
        }
    };

    return (
        <>
            <Button size="small">
                <Link className={styles.link} to="/">
                    Назад
                </Link>
            </Button>

            {isLoading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <h1 className={styles.title}>Наименование задачи:</h1>
                    {stateUpdating !== 'edit' ? (
                        <input
                            type="text"
                            name="newTodo"
                            placeholder="Введите новое дело..."
                            value={todo.title}
                            onChange={onChangeValue}
                            className={styles.input}
                        />
                    ) : (
                        <p>{todo.title}</p>
                    )}

                    <div className={styles['button-list']}>
                        <Button
                            onClick={() => onClickUpdating()}
                            isDisabled={stateUpdating === 'pending'}
                        >
                            {getNameButton()}
                        </Button>

                        <Button
                            onClick={() => onRemoveTodo({ id: params.id })}
                            isDisabled={isRemoving}
                        >
                            Удалить
                        </Button>
                    </div>

                    {isRemoving && (
                        <p className={styles.statusInfo}>Задача удалена</p>
                    )}
                </>
            )}
        </>
    );
};
