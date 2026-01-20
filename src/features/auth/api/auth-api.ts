import {LoginCredentials, AuthResponse} from '../types';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credentials.login === 'admin' && credentials.password === 'admin') {
                resolve({token: 'mock-jwt-token'});
            } else {
                reject(new Error('Неверный логин или пароль'));
            }
        }, 2000);
    });
};

export const logout = () => {
    localStorage.removeItem('token');
};


