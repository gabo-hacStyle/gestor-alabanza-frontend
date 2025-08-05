type User ={
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: 'ADMIN' | 'DIRECTOR' | 'MUSICIAN';
    createdAt: string;
}

type UpdateUser = Partial<User>;

