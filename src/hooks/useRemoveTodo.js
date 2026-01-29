import { useNavigate } from 'react-router-dom';
import { fetchRemoveTodo } from '../api/todoApi';
import { URL_DATA } from '../constants/constants';

export const useRemoveTodo = () => {
    const navigate = useNavigate();

    const onRemoveTodo = ({ id }) => {
        fetchRemoveTodo({
            url: `${URL_DATA}/${id}`,
        })
            .then(() => {
                navigate('/', { replace: true });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return {
        onRemoveTodo,
    };
};
