import { StudentInterface } from "../../domain/ports/StudentInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StudentResponse } from "../dtos/response/StudentResponse";

export class GetStudentByUUIDUseCases {
    constructor(readonly repository: StudentInterface) { }

    async execuse(uuidStudent: string): Promise<BaseResponse> {
        let result = await this.repository.findByUUID(uuidStudent);
        if (result) {
            let response = new StudentResponse(result.uuid, result.name, result.email, result.tutor, result.subjects);
            return new BaseResponse(response, "Student found successfully", true, 200);
        } else {
            return new BaseResponse(null, "Student not found", false, 404);
        }
    }
}