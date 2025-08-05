

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
    musicians: User[];
    songs?: Song[];
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


type UpdateAssignment = {
    directorIds: string[];
    musicianAssignments: MusicianAssignment[];
}

type UpdateAssignmentBody = Partial<UpdateAssignment>;