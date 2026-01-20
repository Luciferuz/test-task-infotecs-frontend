import {User, CreateUserDto, UpdateUserDto} from '../types/user';
import {api} from "../../../shared/api/config";

export const userApi = {
    getAll: () => api.get<User[]>('/users'),
    create: (data: CreateUserDto) => api.post<User>('/users', data),
    update: (id: string, data: UpdateUserDto) => api.put<User>(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
};


