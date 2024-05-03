import { Subject } from "../../domain/entities/Subject";
import { SubjectInterface } from "../../domain/ports/SubjectInterface";
import { UpdateSubjectRequest } from "../dtos/request/UpdateSubjectRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { SubjectResponse } from "../dtos/response/SubjectResponse";

export class UpdateSubjectUseCases {
    constructor(readonly repository: SubjectInterface) { }

    async execuse(request: UpdateSubjectRequest): Promise<BaseResponse> {
        let student = new Subject(request.name, request.description);
        let result = await this.repository.create(student);
        if (result) {
            let response = new SubjectResponse(result.uuid, result.name, result.description, result.students);
            return new BaseResponse(response, "Subject updated successfully", true, 200);
        } else {
            return new BaseResponse(null, "Error updating subject", false, 500);
        }
    }
}