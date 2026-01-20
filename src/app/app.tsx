import React, {ReactNode} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ConfigProvider} from 'antd';
import ruRU from 'antd/locale/ru_RU';
import {LoginComponent} from '../pages/login/login.component';
import {ProtectedRoute} from './providers/protected-route.component';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const AuthChecker: React.FC<{ children: ReactNode }> = ({children}) => {
    const _token = localStorage.getItem('token'); // TODO: получаем токен, проверяем права пользователя...
    return <>{children}</>;
};

export const App: React.FC = () => {
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
                                        <LoginComponent/>
                                }
                            />
                            <Route
                                path="/users"
                                element={
                                    <ProtectedRoute>
                                        TODO users list
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/404" element={<>TODO NOT FOUND</>}/>
                            <Route path="/" element={<Navigate to="/users" replace/>}/>
                            <Route path="*" element={<Navigate to="/404" replace/>}/>
                        </Routes>
                    </AuthChecker>
                </BrowserRouter>
            </ConfigProvider>
        </QueryClientProvider>
    );
};

