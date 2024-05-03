import { Request, Response } from 'express';

import { AddTutorToStudentUseCases } from "../../application/use_cases/AddTutorToStudentUseCases";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';

export class AddTutorToStudentController{
    constructor(readonly useCase: AddTutorToStudentUseCases){}

    async execute(req: Request, res: Response){
        const uuidStudent = req.params.uuidStudent;
        const uuidTutor = req.params.uuidTutor;
        try{
            const baseResponse = await this.useCase.execute(uuidStudent, uuidTutor);
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}