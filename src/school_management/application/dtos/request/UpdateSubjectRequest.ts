export class UpdateStudentRequest{
    public name: string;
    public description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}