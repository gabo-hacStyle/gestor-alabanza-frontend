'use server'
import { BASE_URL } from "./urls";

const BASE_ADMIN = `${BASE_URL}/admin`;

export const createService = async (service: Service) => {
    const response = await fetch(`${BASE_ADMIN}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(service)
    })
    if (!response.ok) {
        throw new Error('Failed to create service');
    }
    const data = await response.json() as Service;
    return data;
}

export const updateServiceAssignments = async (id: string, updateAssingmentReques: UpdateAssignmentBody) => {
    const response = await fetch(`${BASE_ADMIN}/${id}/assingments`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateAssingmentReques)
    })
    if (!response.ok) {
        throw new Error('Failed to update service assignments');
    }
    const data = await response.json() as Service;
    return data;
}

export const updateServiceGeneral = async (id: string, service: UpdateServiceGeneralBody) => {
    const response = await fetch(`${BASE_ADMIN}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(service)
    })
    if (!response.ok) {
        throw new Error('Failed to update service general');
    }
    const data = await response.json() as Service;
    return data;
}