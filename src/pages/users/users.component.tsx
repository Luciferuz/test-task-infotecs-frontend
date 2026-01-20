import React, {FC, useState} from 'react';
import {Button, Card, Avatar, Typography, Space, Row, Col, Layout} from 'antd';
import {LogoutOutlined, UserAddOutlined} from '@ant-design/icons';
import {useUsers} from '../../entities/user/model/use-users.hook';
import {useAuth} from '../../features/auth/model/use-auth.hook';
import {User} from '../../entities/user/types/user';
import {StyledHeader, UserCard} from "./users.styles";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {EditUserModal} from "../../features/ui/modals/edit-user.component";
import {CreateUserModal} from "../../features/ui/modals/create-user.component";

const {Title, Text} = Typography;
const {Content} = Layout;

dayjs.locale('ru');


export const UsersPage: FC = () => {
    const {users, isLoading} = useUsers();
    const {logout} = useAuth();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleCardClick = (user: User) => {
        setSelectedUser(user);
    };

    const formatDate = (dateString: string) =>
        dayjs(dateString).format('DD.MM.YYYY');


    return (
        <Layout style={{minHeight: '100vh'}}>
            <StyledHeader>
                <Title level={4} style={{margin: 0}}>
                    База пользователей
                </Title>
                <Space>
                    <Button
                        type="primary"
                        icon={<UserAddOutlined/>}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Создать пользователя
                    </Button>
                    <Button
                        icon={<LogoutOutlined/>}
                        onClick={logout}
                    >
                        Выход
                    </Button>
                </Space>
            </StyledHeader>

            <Content style={{padding: '24px'}}>
                <Row gutter={[16, 16]}>
                    {users.map((user) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
                            <UserCard onClick={() => handleCardClick(user)}>
                                <Card.Meta
                                    avatar={
                                        <Avatar
                                            src={user.avatar}
                                            size={64}
                                            style={{border: '2px solid #f0f0f0'}}
                                        />
                                    }
                                    title={user.name}
                                    description={
                                        <Text type="secondary">
                                            Зарегистрирован {formatDate(user.createdAt)}
                                        </Text>
                                    }
                                />
                            </UserCard>
                        </Col>
                    ))}
                </Row>
            </Content>

            <CreateUserModal
                open={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    open={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </Layout>
    );
};


