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
    const assignments: Assignment = {
        directorIds: data.directors.map(director => director.id),
        musiciansList: data.musiciansList.map(musician => ({
            musicianIds: musician.musician.map(m => m.id),
            instrument: musician.instrument
        }))
    }
    
    return assignments
}
