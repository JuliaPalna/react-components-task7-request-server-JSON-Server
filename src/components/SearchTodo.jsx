import { useState } from 'react';
import { Button } from './Button';
import styles from '../styles/searchTodo.module.css';

export const SearchTodo = ({ onReset, onSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const onChange = ({ target }) => {
        setSearchValue(target.value);
    };

    return (
        <div className={styles.container}>
            <label htmlFor="search">Поиск:</label>
            <input
                type="text"
                name="search"
                placeholder="Введите строку поиска..."
                value={searchValue}
                onChange={onChange}
                className={styles.input}
            />

            <div className={styles['button-list']}>
                <Button
                    onClick={() => {
                        onSearch(searchValue);
                    }}
                >
                    Поиск
                </Button>
                <Button
                    onClick={() => {
                        onReset();
                        setSearchValue('');
                    }}
                >
                    Отмена
                </Button>
            </div>
        </div>
    );
};
