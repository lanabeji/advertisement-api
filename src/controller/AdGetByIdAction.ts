import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Ad} from "../entity/Ad";

/**
 * Loads ad by a given id.
 */
export async function adGetByIdAction(request: Request, response: Response) {

    console.log("Fetching ad by id");

    const adRepository = getManager().getRepository(Ad);
    const ad = await adRepository.findOne(request.params.id);

    // if ad was not found return 404 to the client
    if (!ad) {
        response.status(404).send("Ad with id " + request.params.id + " was not found");
    }

    response.send(ad);
}