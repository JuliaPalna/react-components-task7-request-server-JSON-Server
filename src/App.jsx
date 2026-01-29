import { Routes, Route, Navigate } from 'react-router-dom';
import { TodoListPage, TodoPage, NotFoundPage, TodoErrorPage } from './page';
import styles from './styles/app.module.css';

export const App = () => {
    return (
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<TodoListPage />} />

                <Route path="/task/:id" element={<TodoPage />} />

                <Route path="/todo-loader-error" element={<TodoErrorPage />} />

                <Route path="/404" element={<NotFoundPage />} />

                <Route
                    path="*"
                    element={<Navigate to="/404" replace={true} />}
                />
            </Routes>
        </div>
    );
};
