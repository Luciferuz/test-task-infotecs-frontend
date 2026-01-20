import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {userApi} from '../api/user-api';
import {CreateUserDto, UpdateUserDto} from '../types/user';
import {notification} from 'antd';

export const useUsers = () => {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: () => userApi.getAll().then(res => res.data),
    });

    const createMutation = useMutation({
        mutationFn: (data: CreateUserDto) => userApi.create(data),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ['users']});
            notification.success({message: 'Пользователь создан'});
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({id, ...data}: UpdateUserDto) => userApi.update(id, {id, ...data}),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ['users']});
            notification.success({message: 'Пользователь обновлен'});
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => userApi.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ['users']});
            notification.success({message: 'Пользователь удален'});
        },
    });

    return {
        users: usersQuery.data || [],
        isLoading: usersQuery.isLoading,
        createUser: createMutation.mutate,
        updateUser: updateMutation.mutate,
        deleteUser: deleteMutation.mutate,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};