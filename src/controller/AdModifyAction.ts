import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Ad} from "../entity/Ad";

/**
 * Modifies given ad.
 */
export async function adModifyAction(request: Request, response: Response) {

    console.log("Modifying Ad");
    const adRepository = getManager().getRepository(Ad);
    const ad = await adRepository.findOne(request.params.id);
    
    if (ad) {
        // Checks if fields are in the body to avoid setting fields to null
        if (request.body.offerMessage) {
            ad.offerMessage = request.body.offerMessage;
        }
        if (request.body.url) {
            ad.url = request.body.url;
        }
        if (request.body.startDate) {
            ad.startDate = request.body.startDate;
        }
        if (request.body.endDate) {
            ad.endDate = request.body.endDate;
        }
        if (request.body.category) {
            ad.category = request.body.category;
        }    

        await adRepository.save(ad);
        response.send(ad);
    } else {
        response.status(404).send("Ad with id " + request.params.id + " was not found");
    }
}