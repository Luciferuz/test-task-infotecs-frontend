import React, {FC, ReactNode} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/locale/ru_RU';
import {LoginPage} from '../pages/login/login.component';
import {ProtectedRoute} from './providers/protected-route.component';
import {NotFoundPage} from "../pages/not-found/not-found.component";
import {UsersPage} from "../pages/users/users.component";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const AuthChecker: FC<{ children: ReactNode }> = ({children}) => {
    const _token = localStorage.getItem('token'); // TODO: получаем токен, проверяем права пользователя...
    return <>{children}</>;
};

export const App: FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider locale={ruRU}>
                <BrowserRouter>
                    <AuthChecker>
                        <Routes>
                            <Route
                                path="/login"
                                element={
                                    localStorage.getItem('token') ?
                                        <Navigate to="/users" replace/> :
                                        <LoginPage/>
                                }
                            />
                            <Route
                                path="/users"
                                element={
                                    <ProtectedRoute>
                                        <UsersPage/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/404" element={<NotFoundPage/>}/>
                            <Route path="/" element={<Navigate to="/users" replace/>}/>
                            <Route path="*" element={<Navigate to="/404" replace/>}/>
                        </Routes>
                    </AuthChecker>
                </BrowserRouter>
            </ConfigProvider>
        </QueryClientProvider>
    );
};

