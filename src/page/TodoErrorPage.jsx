import styles from '../styles/containerError.module.css';

export const TodoErrorPage = () => {
    return (
        <div className={styles.container}>
            <p>Ошибка загрузки задачи. Попробуйте, еще раз</p>
        </div>
    );
};
