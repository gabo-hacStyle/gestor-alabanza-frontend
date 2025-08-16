'use server'
import { BASE_URL } from "./urls";

const BASE_SERVICES = `${BASE_URL}/services`

export const getAllServices = async () => {
    const response = await fetch(`${BASE_SERVICES}`)
    return response.json()
}

export const getServiceById = async (id: string) => {
    const response = await fetch(`${BASE_SERVICES}/${id}`)
    return response.json()
}

export const getServiceByIdAndGetAssignments = async (id: string) => {
    const response = await fetch(`${BASE_SERVICES}/${id}`)
    const data = await response.json() as Service;
    const assignments = {
        directorIds: data.directors.map(director => director.id),
        musicianAssignments: data.musiciansList.map(musician => ({
            musicianId: musician.musician.id,
            instrument: musician.instrument
        }))
    }
    
    return assignments
}
