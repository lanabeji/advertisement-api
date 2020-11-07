import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Ad} from "../entity/Ad";

/**
 * Saves given ad.
 */
export async function adSaveAction(request: Request, response: Response) {

    console.log("Creating new Ad");
    const adRepository = getManager().getRepository(Ad);
    const newAd = adRepository.create(request.body);

    await adRepository.save(newAd);

    response.send(newAd);
}