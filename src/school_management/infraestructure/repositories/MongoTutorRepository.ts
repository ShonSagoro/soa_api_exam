import { Collection } from "mongodb";
import { TutorInterface } from "../../domain/ports/TutorInterface";
import { Tutor } from "../../domain/entities/Tutors";
import { connect } from "../../../databases/mongodb";
import { request } from "http";

export class MongoTutorRepository implements TutorInterface {
    private collection!: Collection | any;

    constructor() {
        this.initializeCollection();
    }

    async addStudentToTutor(uuidTutor: string, uuidStudent: string): Promise<Tutor | null> {
        try {
            let result = await this.findByUUID(uuidTutor);
            if (result) {
                await this.collection.updateOne({ uuid: uuidTutor }, { $addToSet: { students: uuidStudent } });
                result = await this.findByUUID(uuidTutor);
                if (result) {
                    let tutor = new Tutor(result.name, result.lastname, result.email);
                    return Promise.resolve(tutor);
                }
                return Promise.resolve(result);
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async create(tutor: Tutor): Promise<Tutor | null> {
        try {
            this.collection.insertOne(tutor);
            return Promise.resolve(tutor);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async update(uuid: string, tutor: Tutor): Promise<Tutor | null> {
        try {
            let tutor_exist = await this.findByUUID(uuid);
            if (tutor_exist) {
                this.collection.updateOne({ uuid: uuid }, { $set: tutor });
                return Promise.resolve(tutor);
            } else {
                return Promise.resolve(null);
            }
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async delete(uuid: string): Promise<void> {
        try {
            this.collection.deleteOne({ uuid: uuid });
            return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    }

    async findByUUID(uuid: string): Promise<Tutor | null> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                let tutor = new Tutor(result.name, result.lastname, result.email);
                return tutor;
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async list(): Promise<Tutor[] | null> {
        try {
            const result = await this.collection.find().toArray();
            if (result) {
                return result.map((element: any) => {
                    let tutor = new Tutor(element.name, element.lastname, element.email);
                    tutor.uuid = element.uuid;
                    return tutor;
                });
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("tutors");
    }
}