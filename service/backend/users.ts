import { BASE_URL } from "./urls";

const BASE_USERS = `${BASE_URL}/users`

export const geAlltUsers = async () => {
    const response = await fetch(`${BASE_USERS}`)
    const data = await response.json() as User[];
    return data;
}

export const getUserById = async (id: string) => {
    const response = await fetch(`${BASE_USERS}/${id}`)
    const data = await response.json() as User;
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