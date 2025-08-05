import { BASE_URL } from "./urls";

const BASE_DIRECTOR = `${BASE_URL}/director`

export const createSongsList = async (idDirector: string, idService: string, songsList: CreateSongBody) => {
    const response = await fetch(`${BASE_DIRECTOR}/${idDirector}/services/${idService}/songs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(songsList)     
    })
    if (!response.ok) {
        throw new Error('Failed to create songs list');
    }
    const data = await response.json() as Service;
    return data;
}

export const updateSongsList = async (idDirector: string, idService: string, songsList: CreateSongBody) => {
    const response = await fetch(`${BASE_DIRECTOR}/${idDirector}/services/${idService}/songs`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(songsList)
    })
    if (!response.ok) {
        throw new Error('Failed to update songs list');
    }

    const data = await response.json() as Service;
    return data;
}