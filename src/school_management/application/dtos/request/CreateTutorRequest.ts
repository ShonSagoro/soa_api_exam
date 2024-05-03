export class CreateTutorRequest{
    public name: string;
    public lastname: string;
    public email: string;

    constructor(name: string, lastname: string, email: string) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
    }
}