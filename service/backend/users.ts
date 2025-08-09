'use server'
import { BASE_URL } from "./urls";

import { cookies } from 'next/headers';


const BASE_USERS = `${BASE_URL}/users`

export const geAlltUsers = async () => {
    const response = await fetch(`${BASE_USERS}`)
    const data = await response.json() as User[];
    return data;
}

export const getUserById = async (): Promise<User> => {

    const cookieStore = await cookies();
    const userInfo = cookieStore.get('user_info')?.value;
    const userInfoJson = JSON.parse(userInfo || '{}') as User;
    const id = userInfoJson.id;
    if (!id) {
        throw new Error('User not found');
    }
    const response = await fetch(`${BASE_USERS}/${id}`)

    const data = await response.json() as User;

    console.log(data)

    //Actualizar cookie
    cookieStore.set('user_info', JSON.stringify(data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: '/',
    });
    
    return data;
}

//Editar usuario
export const updateUser = async (id: string, user: UpdateUser) => {
    const response = await fetch(`${BASE_USERS}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    const data = await response.json() as User;
    return data;
}

//eliminar usuario
export const deleteUser = async (id: string) => {
    const response = await fetch(`${BASE_USERS}/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    const data = await response.json() as void;
    return data;
}

export const getServicesByUserId = async (id: string) => {
    const response = await fetch(`${BASE_USERS}/${id}/services`)
    const data = await response.json() as Service[];
    return data;
}