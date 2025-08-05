type SystemOperationResponse = {
    operation: string;
    status: string;
    message: string;
}

type SystemHealthResponse = {
    status: string;
    timestamp: string;
    version: string;
    error: string;
}