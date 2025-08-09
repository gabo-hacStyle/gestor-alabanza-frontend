'use server'
import { BASE_URL } from "./urls";

const BASE_SYSTEM = `${BASE_URL}/system`;

export const healthCheck = async () => {
    const response = await fetch(`${BASE_SYSTEM}/health`)
    if (!response.ok) {
        throw new Error('Failed to check health');
    }
    const data = await response.json() as SystemHealthResponse;
    return data;
}

export const deleteSericesExpired = async () => {
    const response = await fetch(`${BASE_SYSTEM}/services/expired`, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error('Failed to delete expired services');
    }
    const data = await response.json() as SystemOperationResponse;
    return data;
}