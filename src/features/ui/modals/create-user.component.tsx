import React, {FC} from 'react';
import {Modal, Form, Input, Button, Space} from 'antd';
import {useUsers} from '../../../entities/user/model/use-users.hook';
import {CreateUserDto} from '../../../entities/user/types/user';

interface CreateUserModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateUserModal: FC<CreateUserModalProps> = ({open, onClose}) => {
    const [form] = Form.useForm();
    const {createUser, isCreating} = useUsers();

    const handleSubmit = (values: CreateUserDto) => {
        createUser(values);
        form.resetFields();
        onClose();
    };

    const validateUrl = (_: any, value: string) => {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!value || urlPattern.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Введите корректный URL'));
    };

    return (
        <Modal
            title="Создание пользователя"
            open={open}
            onCancel={onClose}
            footer={null}
            maskClosable={!isCreating}
            closable={!isCreating}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                disabled={isCreating}
            >
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                        {required: true, message: 'Введите имя'},
                        {min: 3, message: 'Имя должно содержать минимум 3 символа'},
                    ]}
                >
                    <Input placeholder="Введите имя пользователя"/>
                </Form.Item>

                <Form.Item
                    label="Ссылка на аватарку"
                    name="avatar"
                    rules={[
                        {required: true, message: 'Введите ссылку'},
                        {validator: validateUrl},
                    ]}
                >
                    <Input placeholder="https://example.com/avatar.jpg"/>
                </Form.Item>

                <Form.Item>
                    <Space style={{width: '100%', justifyContent: 'flex-end'}}>
                        <Button onClick={onClose} disabled={isCreating}>
                            Отмена
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isCreating}
                            disabled={isCreating}
                        >
                            Создать
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

