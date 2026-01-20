import React, {FC} from 'react';
import {Result, Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import {NotFoundWrapper} from "./not-found.styles";

export const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    return (
        <NotFoundWrapper>
            <Result
                status="404"
                title="404"
                subTitle="Cтраница, которую вы запрашиваете, не существует."
                extra={
                    <Button type="primary" onClick={() => navigate('/users')}>
                        К списку пользователей - на главную
                    </Button>
                }
            />
        </NotFoundWrapper>
    );
};

