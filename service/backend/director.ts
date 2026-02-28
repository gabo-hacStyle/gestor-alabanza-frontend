'use server'
import { BASE_URL } from "./urls";
import { getUserInfo } from "./auth";

const BASE_DIRECTOR = `${BASE_URL}/director`

const getDirectorId = async () => {
    const user = await getUserInfo();
    return user.id;
}

export const createSongsList = async (idService: string, songsList: CreateSongBody[]) => {
    const idDirector = await getDirectorId();
    console.log(idDirector);
    const response = await fetch(`${BASE_DIRECTOR}/${idDirector}/services/${idService}/songs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(songsList)
    })
    console.log(response.status);
    if (!response.ok) {
        if(response.status === 403){
            return {
                status: 403,
                message: 'Forbidden'
            }
        }
        throw new Error('Failed to create songs list');
    }

    const data = await response.json() as Service;
    
    return data;
}

export const updateSongsList = async (idService: string, songsList: CreateSongBody[]) => {
    const idDirector = await getDirectorId();
    const response = await fetch(`${BASE_DIRECTOR}/${idDirector}/services/${idService}/songs`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(songsList)
    })
    if (!response.ok) {
        if(response.status === 403){
            return {
                status: 403,
                message: 'Forbidden'
            }
        }
        throw new Error('Failed to update songs list');
    }

    const data = await response.json() as Service;
    return data;
}

export const assignClothesColorToService = async (color: string, idService: string, ) => {const idDirector = await getDirectorId();
    console.log(idDirector);
    const response = await fetch(`${BASE_DIRECTOR}/${idDirector}/services/${idService}/clothes`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/text'
        },
        body: color
    })
    console.log(response.status);
    if (!response.ok) {
        if(response.status === 403){
            return {
                status: 403,
                message: 'Forbidden'
            }
        }
        throw new Error('Failed to set clothes color');
    }

    const data = await response.json() as Service;
    
    return data;
}