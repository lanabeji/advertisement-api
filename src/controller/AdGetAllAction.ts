import {Request, Response} from "express";
import {getManager, Between} from "typeorm";
import {Ad} from "../entity/Ad";

/**
 * Loads all ads from the database.
 */
export async function adGetAllAction(request: Request, response: Response) {

    console.log("Fetching ads");
    const adRepository = getManager().getRepository(Ad);

    const conditions = {}
    if (request.query.category){
        conditions['category'] = request.query.category;
    }
    if (request.query.start_date){
        const dateRange = (request.query.start_date as string).split(',');
        if (dateRange.length == 2){
            conditions['startDate'] = Between(dateRange[0], dateRange[1]);
        }
    }
    if (request.query.end_date){
        const dateRange = (request.query.end_date as string).split(',');
        if (dateRange.length == 2){
            conditions['endDate'] = Between(dateRange[0], dateRange[1]);
        }
    }

    const ads = await adRepository.find({ where: conditions });

    response.send(ads);
}