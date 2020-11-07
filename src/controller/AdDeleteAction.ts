import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Ad} from "../entity/Ad";

/**
 * Deletes an ad by a given id.
 */
export async function adDeleteAction(request: Request, response: Response) {

    console.log("Deleting Ad by id");

    const adRepository = getManager().getRepository(Ad);
    const ad = await adRepository.findOne(request.params.id);

    // if ad was not found return 404 to the client
    if (ad) {
        await adRepository.remove(ad);
        response.send(ad);
    } else {
        response.status(404).send("Ad with id " + request.params.id + " was not found");
    }
}