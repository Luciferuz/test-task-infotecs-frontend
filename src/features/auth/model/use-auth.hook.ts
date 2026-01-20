import {useMutation} from '@tanstack/react-query';
import {login, logout} from '../api/auth-api';
import {notification} from 'antd';
import {useNavigate} from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            notification.success({
                message: 'Успешный вход',
                description: 'Вы успешно авторизовались',
            });
            navigate('/users');
        },
        onError: (error: Error) => {
            notification.error({
                message: 'Ошибка авторизации',
                description: error.message,
            });
        },
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    return {
        login: loginMutation.mutate,
        isLoading: loginMutation.isPending,
        logout: handleLogout,
        isAuthenticated,
    };
};