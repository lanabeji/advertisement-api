import {Request, Response} from "express";


export async function healthCheck(request: Request, response: Response) {

    response.send("Alive and running");
}