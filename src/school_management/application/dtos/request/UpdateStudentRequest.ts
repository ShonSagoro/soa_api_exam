export class UpdateStudentRequest{
    public name: string;
    public email: string;
    public tutor: string;

    constructor(name: string, email: string, tutor: string) {
        this.name = name;
        this.email = email;
        this.tutor = tutor;
    }
}