import styles from '../styles/containerError.module.css';

export const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <p>404 Ошибка!</p>
            <p>Нет такой страницы.</p>
        </div>
    );
};
