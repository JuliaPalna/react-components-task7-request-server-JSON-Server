import { useEffect, useState } from 'react';
import { AppContext } from './context';
import { TodoList, ControlPanel } from './components';
import { URL_DATA } from './constants/constants';
import * as utils from './api/taskApi';
import styles from './styles/app.module.css';

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [filtredTodos, setFiltredTodos] = useState(todos);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        utils
            .getDataFetch({
                url: URL_DATA,
            })
            .then((data) => {
                setTodos(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setFiltredTodos(todos);
    }, [todos]);

    const dispatch = (action) => {
        const { type, payload } = action;

        switch (type) {
            case 'SET_TODOS_DATA': {
                setTodos(payload);
                break;
            }
            case 'FILTRED_TODOS_DATA':
            case 'SORTED_TODOS_DATA': {
                setFiltredTodos(payload);
                break;
            }
            default:
                break;
        }
    };

    return (
        <AppContext value={{ todos, dispatch }}>
            <div className={styles.container}>
                <ControlPanel />

                <TodoList isLoading={isLoading} filtredTodos={filtredTodos} />
            </div>
        </AppContext>
    );
};
