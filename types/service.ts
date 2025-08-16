

type MusiciansList = {
    musician: User;
    instrument: string;
}

type Service = {
    id: string;
    serviceDate: string;
    practiceDate: string;
    location: string;
    createdAt: string;
    directors: User[];
    musiciansList: MusiciansList[];
    songsList: Song[];
}

type UpdateServiceGeneral = {
    serviceDate: string;
    practiceDate: string;
    location: string;
};

type UpdateServiceGeneralBody = Partial<UpdateServiceGeneral>;

type MusicianAssignment = {
    musicianId: string;
    instrument: string;
}

type UpdateAssignmentRequest = {
    directorIds: User[];
    musiciansList: MusiciansList[];
}

type UpdateAssignment = {
    directorIds: string[];
    musiciansList: MusicianAssignment[];
}

type UpdateAssignmentBody = Partial<UpdateAssignment>;

type CreateServiceRequest = {
    serviceDate: string;
    practiceDate: string;
    location: string;
    directorIds: string[];
    musicianAssignments: MusicianAssignment[];
}

type CreateServiceRequestBody = Partial<CreateServiceRequest>;

