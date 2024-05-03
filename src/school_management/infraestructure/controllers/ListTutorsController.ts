import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { ListSubjectsUseCases } from '../../application/use_cases/ListSubjectsUseCases';
import { ListTutorsUseCases } from '../../application/use_cases/ListTutorsUseCases';

export class ListTutorsController{
    constructor(readonly useCase: ListTutorsUseCases){}

    async execute(req: Request, res: Response){
        try{
            const baseResponse = await this.useCase.execute();
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}