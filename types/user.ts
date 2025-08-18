type User ={
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    roles: ('ADMIN' | 'DIRECTOR' | 'MUSICIAN')[]; // Cambiado de role a roles como array
    createdAt: string;
}

type UpdateUser = Partial<User>;

