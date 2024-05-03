import { v4 as uuidv4 } from 'uuid';

export class Student{
    public uuid: string;
    public name: string;
    public email: string;
    public tutor: string;
    public subjects: string[];

    constructor(name: string, email: string, tutor: string){
        this.uuid = uuidv4();
        this.name = name;
        this.email = email;
        this.tutor = tutor;
        this.subjects = [];
    }
}