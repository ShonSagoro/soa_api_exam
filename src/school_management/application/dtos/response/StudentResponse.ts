export class StudentResponse {
    public uuid: string;
    public name: string;
    public email: string;
    public tutor: string;
    public subjects: string[];

    constructor(uuid: string, name: string, email: string, tutor: string, subjects: string[]) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.tutor = tutor;
        this.subjects = subjects;
    }
}