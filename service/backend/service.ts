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
