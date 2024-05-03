import { StudentInterface } from "../../domain/ports/StudentInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StudentResponse } from "../dtos/response/StudentResponse";

export class GetStudentsByTutorUseCases {
    constructor(readonly repository: StudentInterface) { }

    async execuse(uuidTutor: string): Promise<BaseResponse> {
        let result = await this.repository.findAllStudentsByTutor(uuidTutor);
        if (result) {
            let response = result.map(student => new StudentResponse(student.uuid, student.name, student.email, student.tutor, student.subjects));
            return new BaseResponse(response, "Students listed successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error listing students", false, 500);
        }
    }
}