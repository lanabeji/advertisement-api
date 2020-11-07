import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Ad} from "../entity/Ad";

/**
 * Saves given ad.
 */
export async function adSaveAction(request: Request, response: Response) {

    console.log("Creating new Ad");
    try {
        const adRepository = getManager().getRepository(Ad);
        const missingFields = validate_body(request.body);
        
        if (missingFields.length > 0) {
            response.status(404).send("Missing fields to create new ad: " + missingFields);
        } else {
            const newAd = adRepository.create(request.body);
            await adRepository.save(newAd);
            response.send(newAd);
        }
    } catch (error) {
        response.status(500).send("Internal Error: " + error);
    }
}

function validate_body(body: object) {
    var missingFields = [];
    const expectedFields = ['offerMessage', 'url', 'startDate', 'endDate', 'category'];
    
    for (let field of expectedFields) {
        if (!body.hasOwnProperty(field)) {
            missingFields.push(field)
        }
      }

    return missingFields;
}