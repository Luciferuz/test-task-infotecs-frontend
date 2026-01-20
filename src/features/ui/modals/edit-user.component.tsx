import React, {FC, useEffect} from 'react';
import {Modal, Form, Input, Button, Space} from 'antd';
import {useUsers} from '../../../entities/user/model/use-users.hook';
import {User, UpdateUserDto} from '../../../entities/user/types/user';


interface EditUserModalProps {
    user: User;
    open: boolean;
    onClose: () => void;
}

export const EditUserModal: FC<EditUserModalProps> = ({user, open, onClose}) => {
    const [form] = Form.useForm();
    const {updateUser, deleteUser, isUpdating, isDeleting} = useUsers();

     useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }
    }, [user, form]);

    const handleSubmit = (values: UpdateUserDto) => {
        updateUser({...values, id: user.id});
        onClose();
    };

    const handleDelete = () => {
        deleteUser(user.id);
        onClose();
    };

    const validateUrl = (_: any, value: string) => {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!value || urlPattern.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Введите корректный URL картинки'));
    };

    const isLoading = isUpdating || isDeleting;

    return (
        <Modal
            title="Редактирование пользователя"
            open={open}
            onCancel={onClose}
            footer={null}
            maskClosable={!isLoading}
            closable={!isLoading}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                disabled={isLoading}
            >
                <Form.Item label="ID" name="id">
                    <Input disabled/>
                </Form.Item>

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
                    <Space style={{width: '100%', justifyContent: 'space-between'}}>
                        <Button
                            type="primary"
                            danger
                            onClick={handleDelete}
                            loading={isDeleting}
                            disabled={isLoading}
                        >
                            Удалить
                        </Button>
                        <Space>
                            <Button onClick={onClose} disabled={isLoading}>
                                Отмена
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isUpdating}
                                disabled={isLoading}
                            >
                                Сохранить
                            </Button>
                        </Space>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

