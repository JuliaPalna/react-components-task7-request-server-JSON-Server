import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TodoList } from './TodoList';
import { Todo } from './Todo';
import { NotFound404 } from './NotFound404';
import { TodoLoaderError } from './TodoLoaderError';
import { URL_DATA } from '../variables/variables';
import * as utils from '../utils/utils';
import styles from '../styles/App.module.css';

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const todosData = utils.getDataFetchRequest({
            url: URL_DATA,
        });

        todosData
            .then((data) => {
                setTodos(data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <TodoList
                            todos={todos}
                            setTodos={setTodos}
                            isLoading={isLoading}
                        />
                    }
                />
                <Route
                    path="/task/:id"
                    element={<Todo setTodos={setTodos} />}
                />

                <Route
                    path="/todo-loader-error"
                    element={<TodoLoaderError />}
                />

                <Route path="/404" element={<NotFound404 />} />

                <Route
                    path="*"
                    element={<Navigate to="/404" replace={true} />}
                />
            </Routes>
        </div>
    );
};
