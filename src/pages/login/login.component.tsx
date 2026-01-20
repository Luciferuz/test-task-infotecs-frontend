import React, {FC, useEffect} from 'react';
import {Form, Input, Button, Typography} from 'antd';
import {useAuth} from '../../features/auth/model/use-auth.hook';
import {LoginCredentials} from '../../features/auth/types';
import {useNavigate} from 'react-router-dom';
import {LoginContainer, StyledCard} from './login.styles';

const {Title} = Typography;

export const LoginComponent: FC = () => {
    const {login, isLoading, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/users');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (values: LoginCredentials) => {
        login(values);
    };

    return (
        <LoginContainer>
            <StyledCard>
                <Title level={2} style={{textAlign: 'center', marginBottom: 30}}>
                    Авторизация
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{login: '', password: ''}}
                >
                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={[
                            {required: true, message: 'Введите логин'},
                        ]}
                    >
                        <Input size="large" placeholder="Введите логин"/>
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {required: true, message: 'Введите пароль'},
                        ]}
                    >
                        <Input.Password size="large" placeholder="Введите пароль"/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={isLoading}
                            disabled={isLoading}
                            block
                        >
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </StyledCard>
        </LoginContainer>
    );
};

