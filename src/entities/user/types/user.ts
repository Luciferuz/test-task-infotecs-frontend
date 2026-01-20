export interface User {
    id: string;
    name: string;
    avatar: string;
    createdAt: string;
}

export interface CreateUserDto {
    name: string;
    avatar: string;
}

export interface UpdateUserDto extends CreateUserDto {
    id: string;
}