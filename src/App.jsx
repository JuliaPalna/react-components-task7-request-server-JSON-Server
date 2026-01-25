import { useEffect, useState } from 'react';
import { AppContext } from './context';
import { TodoList, ControlPanel } from './components';
import { URL_DATA } from './constants/constants';
import * as utils from './api/taskApi';
import styles from './styles/app.module.css';
import { reducer } from './reducer';

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
        const newState = reducer(todos, action);

        setTodos(newState);
    };

    return (
        <AppContext value={{ todos, dispatch }}>
            <div className={styles.container}>
                <ControlPanel setFiltredTodos={setFiltredTodos} />

                <TodoList isLoading={isLoading} array={filtredTodos} />
            </div>
        </AppContext>
    );
};
