import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components';
import { useRemoveTodo, useUpdateTodos } from '../hooks';
import { LOADING_TIMEOUT, URL_DATA } from '../constants/constants';
import { fetchTodos } from '../api/todoApi';
import styles from '../styles/todo.module.css';

export const TodoPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { onRemoveTodo } = useRemoveTodo();
    const { stateUpdating, onUpdateTodos } = useUpdateTodos();

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

        const todoData = fetchTodos({
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
        if (stateUpdating === 'edit') {
            onUpdateTodos({ value: todo.title, id: params.id });
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
            <div>
                <Link to="/">Назад</Link>
            </div>

            {isLoading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <h1 className={styles.title}>Наименование задачи:</h1>

                    <textarea
                        type="text"
                        name="newTodo"
                        placeholder="Введите новое дело..."
                        value={todo.title}
                        onChange={onChangeValue}
                        className={styles.input}
                    />

                    <div className={styles['button-list']}>
                        <Button
                            onClick={() => onClickUpdating()}
                            isDisabled={stateUpdating === 'pending'}
                        >
                            {getNameButton()}
                        </Button>

                        <Button onClick={() => onRemoveTodo({ id: params.id })}>
                            Удалить
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};
